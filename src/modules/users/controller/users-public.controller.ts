import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUsersDto } from "../dto/create-users.dto";
import { Users } from "../entities/users.entity";
import { UsersService } from "../services/users.service";

@Controller("users")
@ApiTags("Users (Public)")
export class UsersPublicController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: "Tạo user (không cần auth)" })
    @ApiBody({ type: CreateUsersDto })
    @ApiResponse({ status: 201, description: "Tạo thành công" })
    @ApiResponse({ status: 400, description: "Dữ liệu không hợp lệ" })
    async create(@Body() dto: CreateUsersDto) {
        return this.usersService.create(null, (dto || {}) as Partial<Users>);
    }
}
