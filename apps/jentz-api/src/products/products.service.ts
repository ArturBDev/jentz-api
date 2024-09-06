import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Products } from "./entities/products.entity";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createProductsDto: CreateProductsDto): Promise<Products> {
    try {
      const product = await this.prisma.product.create({
        data: {
          name: createProductsDto.name,
          description: createProductsDto.description,
          price: createProductsDto.price,
          category: createProductsDto.category,
          createdAt: new Date(),
          updatedAt: new Date(),
          medicationId: createProductsDto.medicationId,
          leafletUrl: createProductsDto.leafletUrl,
          productImageUrl: createProductsDto.productImageUrl,
        },
      });
      return product;
    } catch (error) {
      this.logger.error("Error creating product", (error as Error).stack);
      throw new BadRequestException("An error occurred creating the product");
    }
  }

  async findAll(): Promise<Products[]> {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      this.logger.error("Error retrieving products", (error as Error).stack);
      throw new InternalServerErrorException(
        "An error occurred retrieving products"
      );
    }
  }

  async findOne(id: number): Promise<Products> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      this.logger.error(
        `Error retrieving product with ID ${id}`,
        (error as Error).stack
      );
      throw new InternalServerErrorException(
        `An error occurred retrieving the product with ID ${id}`
      );
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductsDto
  ): Promise<Products> {
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: updateProductDto.price,
          category: updateProductDto.category,
          updatedAt: new Date(),
          medicationId: updateProductDto.medicationId,
          leafletUrl: updateProductDto.leafletUrl,
          productImageUrl: updateProductDto.productImageUrl,
        },
      });

      return product;
    } catch (error) {
      this.logger.error(
        `Error updating product with ID ${id}`,
        (error as Error).stack
      );
      throw new BadRequestException("An error occurred updating the product");
    }
  }

  async remove(id: number): Promise<Products> {
    try {
      const product = await this.prisma.product.delete({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      this.logger.error(
        `Error deleting product with ID ${id}`,
        (error as Error).stack
      );
      throw new BadRequestException("An error occurred deleting the product");
    }
  }
}
