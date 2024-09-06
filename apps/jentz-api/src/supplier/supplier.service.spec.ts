import { Test, TestingModule } from "@nestjs/testing";
import { SupplierService } from "./supplier.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Supplier } from "@prisma/client";

describe("SupplierService", () => {
  let service: SupplierService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: PrismaService,
          useValue: {
            supplier: {
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

    service = module.get<SupplierService>(SupplierService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a supplier", async () => {
      const dto: CreateSupplierDto = {
        name: "Test Supplier",
        contactInfo: "test@example.com",
      };
      const result: Supplier = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: null,
      };
      jest.spyOn(prismaService.supplier, "create").mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          createdAt: expect.any(Date),
        },
      });
    });

    it("should throw BadRequestException if creation fails", async () => {
      const dto: CreateSupplierDto = {
        name: "Test Supplier",
        contactInfo: "test@example.com",
      };
      jest
        .spyOn(prismaService.supplier, "create")
        .mockRejectedValue(new Error());

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe("findAll", () => {
    it("should return an array of suppliers", async () => {
      const result: Supplier[] = [
        {
          id: 1,
          name: "Test Supplier",
          contactInfo: "test@example.com",
          createdAt: new Date(),
          updatedAt: null,
        },
      ];
      jest.spyOn(prismaService.supplier, "findMany").mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(prismaService.supplier.findMany).toHaveBeenCalled();
    });

    it("should throw InternalServerErrorException if retrieval fails", async () => {
      jest
        .spyOn(prismaService.supplier, "findMany")
        .mockRejectedValue(new Error());

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("findOne", () => {
    it("should return a single supplier", async () => {
      const result: Supplier = {
        id: 1,
        name: "Test Supplier",
        contactInfo: "test@example.com",
        createdAt: new Date(),
        updatedAt: null,
      };
      jest
        .spyOn(prismaService.supplier, "findUnique")
        .mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
      expect(prismaService.supplier.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("update", () => {
    it("should update a supplier", async () => {
      const dto: UpdateSupplierDto = {
        name: "Updated Supplier",
        contactInfo: "updated@example.com",
      };
      const result: Supplier = {
        id: 1,
        name: "Updated Supplier",
        contactInfo: "updated@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.supplier, "update").mockResolvedValue(result);

      expect(await service.update(1, dto)).toEqual(result);
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...dto,
          updatedAt: expect.any(Date),
        },
      });
    });

    it("should throw BadRequestException if update fails", async () => {
      const dto: UpdateSupplierDto = {
        name: "Updated Supplier",
        contactInfo: "updated@example.com",
      };
      jest
        .spyOn(prismaService.supplier, "update")
        .mockRejectedValue(new Error());

      await expect(service.update(1, dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe("remove", () => {
    it("should remove a supplier", async () => {
      const result: Supplier = {
        id: 1,
        name: "Deleted Supplier",
        contactInfo: "deleted@example.com",
        createdAt: new Date(),
        updatedAt: null,
      };
      jest.spyOn(prismaService.supplier, "delete").mockResolvedValue(result);

      expect(await service.remove(1)).toEqual(result);
      expect(prismaService.supplier.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw BadRequestException if deletion fails", async () => {
      jest
        .spyOn(prismaService.supplier, "delete")
        .mockRejectedValue(new Error());

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
    });
  });
});
