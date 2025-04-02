import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          role: createUserDto.role,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  findAll() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new Error("Error finding users");
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error("Error finding user");
    }
  }

  findByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new Error("Error finding user by email");
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new Error("Error updating user");
    }
  }

  remove(id: number) {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}
