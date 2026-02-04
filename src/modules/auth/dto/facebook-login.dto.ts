import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FacebookLoginDto {
    @ApiProperty({
        description: "Facebook access token từ Facebook SDK (phía frontend)",
        example: "EAAG...",
    })
    @IsString()
    @IsNotEmpty()
    accessToken: string;
}
