import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "../users/entities/user.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string) {
    const user = (await this.prisma.user.findUnique({
      where: { email },
    })) as User;

    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async signUp(payload: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          role: payload.role,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return user;
    } catch (error) {
      console.error("Erro detalhado ao criar usuário:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Email já está em uso");
        }
      }
      throw new Error(
        `Erro ao criar usuário: ${error instanceof Error ? error.message : "Erro desconhecido"}`
      );
    }
  }
}
