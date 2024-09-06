import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Product, ProductCategory } from "@prisma/client";

describe("ProductsService", () => {
  let service: ProductsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
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

    service = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a product", async () => {
      const dto: CreateProductsDto = {
        name: "Test Product",
        description: "Test Description",
        price: 100,
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result: Product = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: ProductCategory.MEDICINE,
        description: "Test Description",
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
        name: "Test Product",
        price: 100,
      };
      jest.spyOn(prismaService.product, "create").mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result);
      expect(prismaService.product.create).toHaveBeenCalledWith({
        data: {
          ...dto,
        },
      });
    });

    it("should throw BadRequestException if creation fails", async () => {
      const dto: CreateProductsDto = {
        name: "Test Product",
        description: "Test Description",
        price: 100,
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
      };
      jest
        .spyOn(prismaService.product, "create")
        .mockRejectedValue(new Error());

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe("findAll", () => {
    it("should return an array of products", async () => {
      const result: Product[] = [
        {
          id: 1,
          name: "Test Product",
          description: "Test Description",
          price: 100,
          category: ProductCategory.MEDICINE,
          medicationId: 1,
          leafletUrl: "http://example.com/leaflet",
          productImageUrl: "http://example.com/image",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prismaService.product, "findMany").mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(prismaService.product.findMany).toHaveBeenCalled();
    });

    it("should throw BadRequestException if retrieval fails", async () => {
      jest
        .spyOn(prismaService.product, "findMany")
        .mockRejectedValue(new Error());

      await expect(service.findAll()).rejects.toThrow(
        new InternalServerErrorException(
          "An error occurred retrieving products"
        )
      );
    });
  });

  describe("findOne", () => {
    it("should return a single product", async () => {
      const result: Product = {
        id: 1,
        name: "Test Product",
        description: "Test Description",
        price: 100,
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.product, "findUnique").mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw NotFoundException if product not found", async () => {
      jest.spyOn(prismaService.product, "findUnique").mockResolvedValue(null);

      const id = 1;

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException(
          `An error occurred retrieving the product with ID ${id}`
        )
      );
    });
  });

  describe("update", () => {
    it("should update a product", async () => {
      const dto: UpdateProductsDto = {
        name: "Updated Product",
        description: "Updated Description",
        price: 150,
        category: ProductCategory.OTHER,
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
        updatedAt: new Date(),
      };
      const result: Product = {
        id: 1,
        updatedAt: new Date(),
        category: ProductCategory.OTHER,
        description: "Updated Description",
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
        name: "Updated Product",
        price: 150,
        createdAt: new Date(),
      };
      jest.spyOn(prismaService.product, "update").mockResolvedValue(result);

      expect(await service.update(1, dto)).toEqual(result);
      expect(prismaService.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...dto,
          updatedAt: expect.any(Date),
        },
      });
    });

    it("should throw BadRequestException if update fails", async () => {
      const dto: UpdateProductsDto = {
        name: "Updated Product",
        description: "Updated Description",
        price: 150,
        category: ProductCategory.OTHER,
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
      };
      jest
        .spyOn(prismaService.product, "update")
        .mockRejectedValue(new Error());

      await expect(service.update(1, dto)).rejects.toThrow(
        new BadRequestException("An error occurred updating the product")
      );
    });
  });

  describe("remove", () => {
    it("should remove a product", async () => {
      const result: Product = {
        id: 1,
        name: "Deleted Product",
        description: "Deleted Description",
        price: 100,
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com/leaflet",
        productImageUrl: "http://example.com/image",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.product, "delete").mockResolvedValue(result);

      expect(await service.remove(1)).toEqual(result);
      expect(prismaService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should throw BadRequestException if deletion fails", async () => {
      jest
        .spyOn(prismaService.product, "delete")
        .mockRejectedValue(new Error());

      await expect(service.remove(1)).rejects.toThrow(
        new BadRequestException("An error occurred deleting the product")
      );
    });
  });
});
