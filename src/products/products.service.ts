import { Injectable } from "@nestjs/common";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductsDto: CreateProductsDto) {
    return this.prisma.product.create({
      data: {
        name: createProductsDto.name,
        description: createProductsDto.description,
        price: createProductsDto.price,
        medications: {
          create: createProductsDto.medications,
        },
        category: createProductsDto.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductsDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        category: updateProductDto.category,
        medications: {
          create: updateProductDto.medications,
        },
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
