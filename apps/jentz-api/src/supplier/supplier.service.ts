import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Supplier } from "@prisma/client";

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.create({
        data: {
          name: createSupplierDto.name,
          contactInfo: createSupplierDto.contactInfo,
          createdAt: new Date(),
        },
      });
      return supplier;
    } catch (error) {
      this.logger.error("Error creating supplier", (error as Error).stack);
      throw new BadRequestException("An error occurred creating the supplier");
    }
  }

  async findAll(): Promise<Supplier[]> {
    try {
      return await this.prisma.supplier.findMany();
    } catch (error) {
      this.logger.error("Error retrieving suppliers", (error as Error).stack);
      throw new InternalServerErrorException(
        "An error occurred retrieving suppliers"
      );
    }
  }

  async findOne(id: number): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.findUnique({
        where: { id },
      });

      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }

      return supplier;
    } catch (error) {
      this.logger.error(
        `Error retrieving supplier with ID ${id}`,
        (error as Error).stack
      );
      throw new InternalServerErrorException(
        `An error occurred retrieving the supplier with ID ${id}`
      );
    }
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto
  ): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.update({
        where: { id },
        data: {
          name: updateSupplierDto.name,
          contactInfo: updateSupplierDto.contactInfo,
          updatedAt: new Date(),
        },
      });

      return supplier;
    } catch (error) {
      this.logger.error(
        `Error updating supplier with ID ${id}`,
        (error as Error).stack
      );
      throw new BadRequestException("An error occurred updating the supplier");
    }
  }

  async remove(id: number): Promise<Supplier> {
    try {
      const supplier = await this.prisma.supplier.delete({
        where: { id },
      });

      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }

      return supplier;
    } catch (error) {
      this.logger.error(
        `Error deleting supplier with ID ${id}`,
        (error as Error).stack
      );
      throw new BadRequestException("An error occurred deleting the supplier");
    }
  }
}
