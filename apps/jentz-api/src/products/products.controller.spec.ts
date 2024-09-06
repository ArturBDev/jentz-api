import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Product, ProductCategory } from "@prisma/client";

describe("ProductsController", () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
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

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a product", async () => {
      const dto: CreateProductsDto = {
        name: "Test Product",
        price: 100,
        description: "Test Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
        createdAt: new Date(),
        medications: [],
        updatedAt: new Date(),
      };
      const result: Product = {
        id: 1,
        name: "Test Product",
        price: 100,
        description: "Test Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it("should throw BadRequestException if creation fails", async () => {
      const dto: CreateProductsDto = {
        name: "Test Product",
        price: 100,
        description: "Test Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "create").mockRejectedValue(new Error());

      await expect(controller.create(dto)).rejects.toThrow(
        new HttpException(
          "An error occurred creating product",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of products", async () => {
      const result: Product[] = [
        {
          id: 1,
          name: "Test Product",
          price: 100,
          description: "Test Description",
          category: ProductCategory.MEDICINE,
          medicationId: 1,
          leafletUrl: "http://example.com",
          productImageUrl: "http://example.com",
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
          "An error occurred retrieving products",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("findOne", () => {
    it("should return a single product", async () => {
      const result: Product = {
        id: 1,
        name: "Test Product",
        price: 100,
        description: "Test Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "findOne").mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundException if product not found", async () => {
      jest.spyOn(service, "findOne").mockResolvedValue(null);

      await expect(controller.findOne(1)).rejects.toThrow(
        new HttpException(
          "An error occurred fetching product",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("update", () => {
    it("should update a product", async () => {
      const dto: UpdateProductsDto = {
        name: "Updated Product",
        price: 150,
        description: "Updated Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result: Product = {
        id: 1,
        name: "Updated Product",
        price: 150,
        description: "Updated Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, "update").mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it("should throw BadRequestException if update fails", async () => {
      const dto: UpdateProductsDto = {
        name: "Updated Product",
        price: 150,
        description: "Updated Description",
      };
      jest.spyOn(service, "update").mockRejectedValue(new Error());

      await expect(controller.update(1, dto)).rejects.toThrow(
        new HttpException(
          "An error occurred updating product",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });

  describe("remove", () => {
    it("should remove a product", async () => {
      const result: Product = {
        id: 1,
        name: "Deleted Product",
        price: 100,
        description: "Deleted Description",
        category: ProductCategory.MEDICINE,
        medicationId: 1,
        leafletUrl: "http://example.com",
        productImageUrl: "http://example.com",
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
          "An error occurred deleting product",
          HttpStatus.BAD_REQUEST
        )
      );
    });
  });
});
