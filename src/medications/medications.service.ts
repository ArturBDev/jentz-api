import { Injectable } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { PrismaService } from "src/prisma/prisma.service";

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
        supplier: {
          connect: { id: createMedicationDto.supplierId },
        },
        createdAt: new Date(),
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
        supplier: {
          connect: { id: updateMedicationDto.supplierId },
        },
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
