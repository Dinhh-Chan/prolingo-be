import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginDto {
    @ApiProperty({
        description:
            "Google ID token (credential) từ Google Sign-In. Frontend dùng google.accounts.id.initialize() và callback credential.",
        example: "eyJhbGciOiJSUzI1NiIs...",
    })
    @IsString()
    @IsNotEmpty()
    idToken: string;
}
