import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from "class-validator";
import { Role } from "../../users/entities/user.entity";

export class SignInDto {
  @ApiProperty({
    description: "User's email",
    example: "john@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: "password123",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends SignInDto {
  @ApiProperty({
    description: "User's name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "User's password",
    example: "password123",
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: "User's role",
    example: Role.USER,
    enum: Role,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}

export class AuthResponseDto {
  @ApiProperty({
    description: "JWT access token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  accessToken: string;

  @ApiProperty({
    description: "User information",
    example: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    },
  })
  user: {
    id: number;
    name: string;
    email: string;
  };
}
