import { Test, TestingModule } from "@nestjs/testing";
import { MedicationsService } from "./medications.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { Medication } from "@prisma/client";

describe("MedicationsService", () => {
  let service: MedicationsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicationsService,
        {
          provide: PrismaService,
          useValue: {
            medication: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MedicationsService>(MedicationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a medication", async () => {
      const dto: CreateMedicationDto = {
        name: "Test Medication",
        dosage: "500mg",
        sideEffects: "Nausea",
        prescriptionRequired: true,
        supplierId: 1,
        supplier: {
          id: 0,
          name: "",
          contactInfo: "",
          createdAt: undefined,
          updatedAt: undefined,
        },
      };
      const result: Medication = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
        dosage: "500mg",
        name: "Test Medication",
        prescriptionRequired: true,
        sideEffects: "Nausea",
      };
      jest.spyOn(prismaService.medication, "create").mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prismaService.medication.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          dosage: dto.dosage,
          sideEffects: dto.sideEffects,
          prescriptionRequired: dto.prescriptionRequired,
          createdAt: expect.any(Date),
          medicationSuppliers: {
            create: {
              supplier: {
                connect: { id: dto.supplierId },
              },
            },
          },
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of medications", async () => {
      const result: Medication[] = [
        {
          name: "Test Medication",
          createdAt: new Date(),
          updatedAt: new Date(),
          dosage: "500mg",
          prescriptionRequired: true,
          sideEffects: "Nausea",
          id: 1,
        },
      ];
      jest
        .spyOn(prismaService.medication, "findMany")
        .mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(prismaService.medication.findMany).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single medication", async () => {
      const result: Medication = {
        id: 1,
        name: "Test Medication",
        createdAt: new Date(),
        updatedAt: new Date(),
        dosage: "500mg",
        prescriptionRequired: true,
        sideEffects: "Nausea",
      };
      jest
        .spyOn(prismaService.medication, "findUnique")
        .mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
      expect(prismaService.medication.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw NotFoundException if medication not found", async () => {
      jest
        .spyOn(prismaService.medication, "findUnique")
        .mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        "Medication with ID 1 not found"
      );
    });
  });

  describe("update", () => {
    it("should update a medication", async () => {
      const dto: UpdateMedicationDto = {
        name: "Updated Medication",
        dosage: "500mg",
        sideEffects: "Nausea",
        prescriptionRequired: true,
        supplierId: 1,
      };
      const result: Medication = {
        id: 1,
        ...dto,
        updatedAt: new Date(),
        createdAt: new Date(),
        dosage: "500mg",
        name: "Updated Medication",
        prescriptionRequired: true,
        sideEffects: "Nausea",
      };
      jest.spyOn(prismaService.medication, "update").mockResolvedValue(result);

      expect(await service.update(1, dto)).toEqual(result);
      expect(prismaService.medication.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: dto.name,
          dosage: dto.dosage,
          sideEffects: dto.sideEffects,
          prescriptionRequired: dto.prescriptionRequired,
          updatedAt: expect.any(Date),
          medicationSuppliers: {
            upsert: {
              where: {
                medicationId_supplierId: {
                  medicationId: 1,
                  supplierId: dto.supplierId,
                },
              },
              update: {
                supplier: {
                  connect: { id: dto.supplierId },
                },
              },
              create: {
                supplier: {
                  connect: { id: dto.supplierId },
                },
              },
            },
          },
        },
      });
    });
  });

  describe("remove", () => {
    it("should remove a medication", async () => {
      const result: Medication = {
        id: 1,
        name: "Deleted Medication",
        createdAt: new Date(),
        updatedAt: new Date(),
        dosage: "500mg",
        prescriptionRequired: true,
        sideEffects: "Nausea",
      };

      jest.spyOn(prismaService.medication, "delete").mockResolvedValue(result);

      expect(await service.remove(1)).toEqual(result);
      expect(prismaService.medication.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw NotFoundException if medication not found", async () => {
      jest
        .spyOn(prismaService.medication, "delete")
        .mockRejectedValue(new Error());

      await expect(service.remove(1)).rejects.toThrow(
        "An error occurred deleting the medication"
      );
    });
  });
});
