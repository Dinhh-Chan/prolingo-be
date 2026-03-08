import { RequestAuthData } from "@common/constant/class/request-auth-data";
import { ApiRecordResponse } from "@common/decorator/api.decorator";
import { AllowSystemRoles, ReqUser } from "@common/decorator/auth.decorator";
import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Put,
    Req,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request, Express } from "express";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname, join } from "path";
import { SystemRole } from "../common/constant";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { UpdatePasswordByIdDto } from "../dto/update-password-by-id.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../service/user.service";
import { AbstractValidationPipe } from "@common/pipe/abstract-validation.pipe";

const avatarUploadDir = join(process.cwd(), "public", "avatar_user");
const ensureAvatarDir = () => {
    if (!existsSync(avatarUploadDir)) {
        mkdirSync(avatarUploadDir, { recursive: true });
    }
};
const updateUserValidationPipe = new AbstractValidationPipe(
    { whitelist: true },
    { body: UpdateUserDto },
);

@Controller("user")
@ApiTags("user")
export class UserController extends BaseControllerFactory<User>(
    User,
    null,
    null,
    UpdateUserDto,
    {
        import: {
            enable: false,
        },
        routes: {
            create: {
                enable: false,
            },
            getMany: {
                roles: [
                    SystemRole.USER,
                    SystemRole.ADMIN,
                    SystemRole.STUDENT,
                    SystemRole.TEACHER,
                ],
            },
            getPage: {
                roles: [
                    SystemRole.USER,
                    SystemRole.ADMIN,
                    SystemRole.STUDENT,
                    SystemRole.TEACHER,
                ],
            },
            updateById: {
                enable: false,
            },
        },
        dataPartition: {
            enable: true,
        },
        authorize: true,
    },
) {
    constructor(private readonly userService: UserService) {
        super(userService);
    }

    @Put(":id")
    @AllowSystemRoles(
        SystemRole.USER,
        SystemRole.ADMIN,
        SystemRole.STUDENT,
        SystemRole.TEACHER,
    )
    @ApiRecordResponse(User)
    @ApiOperation({
        summary: "Cập nhật user (hỗ trợ upload avatar và các field khác)",
        description:
            "Nhận multipart/form-data với field avatar là file ảnh và các field text như fullname, firstname, lastname, email, dob, gender. Ảnh được lưu vào thư mục public/avatar_user và đường dẫn được lưu vào avatarUrl. User chỉ có thể cập nhật thông tin của chính mình, admin có thể cập nhật của bất kỳ user nào.",
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                fullname: { type: "string", description: "Họ và tên đầy đủ" },
                firstname: { type: "string", description: "Tên" },
                lastname: { type: "string", description: "Họ" },
                email: {
                    type: "string",
                    format: "email",
                    description: "Email",
                },
                dob: {
                    type: "string",
                    format: "date",
                    description: "Ngày sinh (YYYY-MM-DD)",
                },
                gender: {
                    type: "string",
                    enum: ["MALE", "FEMALE", "OTHER"],
                    description: "Giới tính",
                },
                avatar: {
                    type: "string",
                    format: "binary",
                    description: "Ảnh đại diện (avatar / file / image)",
                },
                avatarUrl: { type: "string", description: "Đường dẫn avatar" },
            },
        },
    })
    @UsePipes(updateUserValidationPipe)
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: "avatar", maxCount: 1 },
                { name: "file", maxCount: 1 },
                { name: "image", maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: (_req, _file, cb) => {
                        ensureAvatarDir();
                        cb(null, avatarUploadDir);
                    },
                    filename: (req, file, cb) => {
                        const fileExt = extname(file.originalname) || "";
                        const safeExt = fileExt || ".png";
                        const filename = `${req.params?.id || "user"}-${Date.now()}${safeExt}`;
                        cb(null, filename);
                    },
                }),
                fileFilter: (_req, file, cb) => {
                    if (!file.mimetype?.startsWith("image/")) {
                        return cb(
                            new BadRequestException(
                                "Avatar tải lên phải là hình ảnh",
                            ),
                            false,
                        );
                    }
                    cb(null, true);
                },
                limits: { fileSize: 5 * 1024 * 1024 },
            },
        ),
    )
    async updateUserById(
        @ReqUser() user: User,
        @Param("id") id: string,
        @Body() dto: UpdateUserDto,
        @UploadedFiles()
        files?: {
            avatar?: Express.Multer.File[];
            file?: Express.Multer.File[];
            image?: Express.Multer.File[];
        },
    ) {
        if (user.systemRole !== SystemRole.ADMIN && user._id !== id) {
            throw new BadRequestException(
                "Bạn chỉ có thể cập nhật thông tin của chính mình",
            );
        }
        const uploadedAvatar =
            files?.avatar?.[0] || files?.file?.[0] || files?.image?.[0];
        if (uploadedAvatar) {
            dto.avatarUrl = `/avatar_user/${uploadedAvatar.filename}`;
        }
        return this.userService.updateById(user, id, dto);
    }

    @Get("me")
    @ApiRecordResponse(User)
    async getMe(@Req() req: Request) {
        const authData = req.user as RequestAuthData;
        return this.userService.getMe(authData);
    }

    @Put("me/password")
    @AllowSystemRoles(
        SystemRole.USER,
        SystemRole.ADMIN,
        SystemRole.STUDENT,
        SystemRole.TEACHER,
    )
    @ApiOperation({
        summary: "Đổi mật khẩu của chính mình",
        description:
            "User đăng nhập gửi mật khẩu cũ (oldPass) và mật khẩu mới (newPass). Cần Bearer token.",
    })
    @ApiRecordResponse(User)
    async changePasswordMe(
        @ReqUser() user: User,
        @Body() dto: ChangePasswordDto,
    ) {
        return this.userService.changePasswordMe(user, dto);
    }

    @Put(":userId/password")
    @AllowSystemRoles(SystemRole.ADMIN)
    @ApiOperation({
        summary: "Admin đổi mật khẩu cho user theo ID",
        description:
            "API để admin đổi mật khẩu cho user khác. Password sẽ được hash trước khi lưu.",
    })
    @ApiRecordResponse(User)
    async updatePasswordById(
        @ReqUser() user: User,
        @Param("userId") userId: string,
        @Body() dto: UpdatePasswordByIdDto,
    ) {
        return this.userService.updatePasswordById(user, userId, dto.password);
    }
}
