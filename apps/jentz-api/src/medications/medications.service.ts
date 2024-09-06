import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Medication } from "@prisma/client";

@Injectable()
export class MedicationsService {
  private readonly logger = new Logger(MedicationsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    try {
      return await this.prisma.medication.create({
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
    } catch (error) {
      this.logger.error("Error creating medication", (error as Error).stack);
      throw new BadRequestException(
        "An error occurred creating the medication"
      );
    }
  }

  async findAll(): Promise<Medication[]> {
    try {
      return await this.prisma.medication.findMany();
    } catch (error) {
      this.logger.error("Error retrieving medications", (error as Error).stack);
      throw new InternalServerErrorException(
        "An error occurred retrieving medications"
      );
    }
  }

  async findOne(id: number): Promise<Medication> {
    try {
      const medication = await this.prisma.medication.findUnique({
        where: { id },
      });

      if (!medication) {
        throw new NotFoundException(`Medication with ID ${id} not found`);
      }

      return medication;
    } catch (error) {
      this.logger.error(
        `Error retrieving medication with ID ${id}`,
        (error as Error).stack
      );
      throw new InternalServerErrorException(
        `An error occurred retrieving the medication with ID ${id}`
      );
    }
  }

  async update(
    id: number,
    updateMedicationDto: UpdateMedicationDto
  ): Promise<Medication> {
    try {
      const medication = await this.prisma.medication.update({
        where: { id },
        data: {
          name: updateMedicationDto.name,
          dosage: updateMedicationDto.dosage,
          sideEffects: updateMedicationDto.sideEffects,
          prescriptionRequired: updateMedicationDto.prescriptionRequired,
          updatedAt: new Date(),
          medicationSuppliers: {
            upsert: {
              where: {
                medicationId_supplierId: {
                  medicationId: id,
                  supplierId: updateMedicationDto.supplierId,
                },
              },
              update: {
                supplier: {
                  connect: { id: updateMedicationDto.supplierId },
                },
              },
              create: {
                supplier: {
                  connect: { id: updateMedicationDto.supplierId },
                },
              },
            },
          },
        },
      });

      return medication;
    } catch (error) {
      this.logger.error(
        `Error updating medication with ID ${id}`,
        (error as Error).stack
      );
      throw new BadRequestException(
        "An error occurred updating the medication"
      );
    }
  }

  async remove(id: number): Promise<Medication> {
    try {
      const medication = await this.prisma.medication.delete({
        where: { id },
      });

      if (!medication) {
        throw new NotFoundException(`Medication with ID ${id} not found`);
      }

      return medication;
    } catch (error) {
      this.logger.error(
        `Error deleting medication with ID ${id}`,
        (error as Error).stack
      );
      throw new BadRequestException(
        "An error occurred deleting the medication"
      );
    }
  }
}
