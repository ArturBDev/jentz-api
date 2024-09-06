import { Test, TestingModule } from "@nestjs/testing";
import { MedicationsController } from "./medications.controller";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";

describe("MedicationsController", () => {
  let controller: MedicationsController;
  let service: MedicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationsController],
      providers: [
        {
          provide: MedicationsService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: 1, name: "Test Medication" }),
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 1, name: "Test Medication" }]),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: 1, name: "Test Medication" }),
            update: jest
              .fn()
              .mockResolvedValue({ id: 1, name: "Updated Medication" }),
            remove: jest
              .fn()
              .mockResolvedValue({ id: 1, name: "Deleted Medication" }),
          },
        },
      ],
    }).compile();

    controller = module.get<MedicationsController>(MedicationsController);
    service = module.get<MedicationsService>(MedicationsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a medication", async () => {
      const dto: CreateMedicationDto = {
        name: "Test Medication",
        supplier: {
          id: 0,
          name: "",
          contactInfo: "",
          createdAt: undefined,
          updatedAt: undefined,
        },
        supplierId: 0,
        prescriptionRequired: false,
      };
      expect(await controller.create(dto)).toEqual({
        id: 1,
        name: "Test Medication",
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("should return an array of medications", async () => {
      expect(await controller.findAll()).toEqual([
        { id: 1, name: "Test Medication" },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single medication", async () => {
      expect(await controller.findOne(1)).toEqual({
        id: 1,
        name: "Test Medication",
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a medication", async () => {
      const dto: UpdateMedicationDto = { name: "Updated Medication" };
      expect(await controller.update(1, dto)).toEqual({
        id: 1,
        name: "Updated Medication",
      });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe("remove", () => {
    it("should remove a medication", async () => {
      expect(await controller.remove(1)).toEqual({
        id: 1,
        name: "Deleted Medication",
      });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
