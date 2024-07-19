import { Injectable } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MedicationsService {
  constructor(private prisma: PrismaService) {}
  create(createMedicationDto: CreateMedicationDto) {
    return this.prisma.medication.create({
      data: {
        name: createMedicationDto.name,
        dosage: createMedicationDto.dosage,
        sideEffects: createMedicationDto.sideEffects,
        prescriptionRequired: createMedicationDto.prescriptionRequired,
        createdAt: new Date(),
        medicationSuppliers: {
          create: {
            supplier: {
              connect: { id: createMedicationDto.supplierId },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.medication.findMany();
  }

  findOne(id: number) {
    return this.prisma.medication.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return this.prisma.medication.update({
      where: { id },
      data: {
        name: updateMedicationDto.name,
        dosage: updateMedicationDto.dosage,
        sideEffects: updateMedicationDto.sideEffects,
        prescriptionRequired: updateMedicationDto.prescriptionRequired,

        updatedAt: new Date(),
        medicationSuppliers: {
          update: {
            where: {
              medicationId_supplierId: {
                medicationId: id,
                supplierId: 0,
              },
            },
            data: {
              supplier: {
                connect: { id: updateMedicationDto.supplierId },
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.medication.delete({
      where: { id },
    });
  }
}
