import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: User,
  })
  @ApiResponse({ status: 400, description: "Invalid data" })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Unknown error", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: "List all users" })
  @ApiResponse({
    status: 200,
    description: "Users list returned",
    type: [User],
  })
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(
        "Unknown error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Find user by ID" })
  @ApiResponse({ status: 200, description: "User found", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("id") id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException("Unknown error", HttpStatus.NOT_FOUND);
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Unknown error", HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove user" })
  @ApiResponse({ status: 200, description: "User removed successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  async remove(@Param("id") id: string) {
    try {
      const user = await this.usersService.remove(+id);
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return { message: "User removed successfully" };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException("Unknown error", HttpStatus.NOT_FOUND);
    }
  }
}
