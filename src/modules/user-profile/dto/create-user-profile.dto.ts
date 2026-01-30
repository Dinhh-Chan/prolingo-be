import { IsString, IsOptional, MaxLength } from "class-validator";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserProfileDto {
    @ApiProperty({ description: "User ID" })
    @IsString()
    @EntityDefinition.field({ label: "User ID", required: true })
    user_id: string;

    @ApiProperty({ description: "Industry ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Industry ID" })
    industry_id?: string;

    @ApiProperty({ description: "Role ID", required: false })
    @IsString()
    @IsOptional()
    @EntityDefinition.field({ label: "Role ID" })
    role_id?: string;

    @ApiProperty({
        description: "Trạng thái hiện tại",
        maxLength: 50,
        required: false,
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    @EntityDefinition.field({ label: "Trạng thái hiện tại" })
    current_status?: string;

    @ApiProperty({
        description: "Trình độ tiếng Anh",
        maxLength: 20,
        required: false,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @EntityDefinition.field({ label: "Trình độ tiếng Anh" })
    english_level?: string;
}
