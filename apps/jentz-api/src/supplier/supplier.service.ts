import { Injectable } from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}
  create(createSupplierDto: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: {
        name: createSupplierDto.name,
        contactInfo: createSupplierDto.contactInfo,
        createdAt: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.supplier.findMany();
  }

  findOne(id: number) {
    return this.prisma.supplier.findUnique({
      where: { id },
    });
  }
  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      where: { id },
      data: {
        name: updateSupplierDto.name,
        contactInfo: updateSupplierDto.contactInfo,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.medication.delete({
      where: { id },
    });
  }
}
