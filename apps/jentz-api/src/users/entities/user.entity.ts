import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, IsNotEmpty } from "class-validator";

export enum Role {
  USER = "USER",
  SUPPLIER = "SUPPLIER",
  ADMIN = "ADMIN",
}

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "usuario@email.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "********" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "João Silva" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
