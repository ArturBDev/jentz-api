import { Test, TestingModule } from "@nestjs/testing";
import { SupplierController } from "./supplier.controller";
import { SupplierService } from "./supplier.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { Supplier } from "./entities/supplier.entity";
import { HttpStatus, HttpException } from "@nestjs/common";

describe("SupplierController", () => {
  let controller: SupplierController;
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
    service = module.get<SupplierService>(SupplierService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a supplier", async () => {
      const dto: CreateSupplierDto = {
        name: "Test Supplier",
        contactInfo: "Test Contact Info",
      };
      const result: Supplier = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it("should throw BadRequestException if creation fails", async () => {
      const dto: CreateSupplierDto = {
        name: "Test Supplier",
        contactInfo: "Test Contact Info",
      };
      jest.spyOn(service, "create").mockRejectedValue(new Error());

      await expect(controller.create(dto)).rejects.toThrow(
        new HttpException(
          "An error occurred creating supplier",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of suppliers", async () => {
      const result: Supplier[] = [
        {
          id: 1,
          name: "Test Supplier",
          contactInfo: "Test Contact Info",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, "findAll").mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });

    it("should throw BadRequestException if retrieval fails", async () => {
      jest.spyOn(service, "findAll").mockRejectedValue(new Error());

      await expect(controller.findAll()).rejects.toThrow(
        new HttpException(
          "An error occurred retrieving suppliers",
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    });
  });

  describe("findOne", () => {
    it("should return a single supplier", async () => {
      const result: Supplier = {
        id: 1,
        name: "Test Supplier",
        contactInfo: "Test Contact Info",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "findOne").mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw BadRequestException if retrieval fails", async () => {
      jest.spyOn(service, "findOne").mockRejectedValue(new Error());

      await expect(controller.findOne(1)).rejects.toThrow(
        new HttpException(
          "An error occurred fetching supplier",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("update", () => {
    it("should update a supplier", async () => {
      const dto: UpdateSupplierDto = {
        name: "Updated Supplier",
        contactInfo: "Updated Contact Info",
      };
      const result: Supplier = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: dto.name,
        contactInfo: dto.contactInfo,
      };
      jest.spyOn(service, "update").mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it("should throw BadRequestException if update fails", async () => {
      const dto: UpdateSupplierDto = {
        name: "Updated Supplier",
        contactInfo: "Updated Contact Info",
      };
      jest.spyOn(service, "update").mockRejectedValue(new Error());

      await expect(controller.update(1, dto)).rejects.toThrow(
        new HttpException(
          "An error occurred updating supplier",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("remove", () => {
    it("should remove a supplier", async () => {
      const result: Supplier = {
        id: 1,
        name: "Deleted Supplier",
        contactInfo: "Deleted Contact Info",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "remove").mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(undefined);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it("should throw BadRequestException if deletion fails", async () => {
      jest.spyOn(service, "remove").mockRejectedValue(new Error());

      await expect(controller.remove(1)).rejects.toThrow(
        new HttpException(
          "An error occurred deleting supplier",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });
});
