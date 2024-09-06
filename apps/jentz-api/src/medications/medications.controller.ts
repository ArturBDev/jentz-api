import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Medication } from "@prisma/client";
import { Medication as MedicationViewModel } from "./entities/medication.entity";
import { AllExceptionsFilter } from "../filters/all-exceptions.filter";

@ApiTags("medications")
@Controller("medications")
@UseFilters(AllExceptionsFilter)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: CreateMedicationDto,
    description: "Medication created successfully",
  })
  @ApiBadRequestResponse({
    description: "An error occurred creating medication",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createMedicationDto: CreateMedicationDto
  ): Promise<Medication> {
    try {
      return await this.medicationsService.create(createMedicationDto);
    } catch (error) {
      throw new HttpException(
        "An error occurred creating medication",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: MedicationViewModel,
    isArray: true,
    description: "Medications retrieved successfully",
  })
  async findAll(): Promise<Medication[]> {
    try {
      return await this.medicationsService.findAll();
    } catch (error) {
      throw new HttpException(
        "An error occurred retrieving medications",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: MedicationViewModel,
    description: "Medication retrieved successfully",
  })
  @ApiBadRequestResponse({
    description: "An error occurred getting medication",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Medication> {
    try {
      return await this.medicationsService.findOne(id);
    } catch (error) {
      throw new HttpException(
        "An error occurred getting medication",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    type: UpdateMedicationDto,
    description: "Medication updated successfully",
  })
  @ApiBadRequestResponse({
    description: "An error occurred updating medication",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMedicationDto: UpdateMedicationDto
  ): Promise<Medication> {
    try {
      return await this.medicationsService.update(id, updateMedicationDto);
    } catch (error) {
      throw new HttpException(
        "An error occurred updating medication",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(":id")
  @ApiOkResponse({ description: "Medication deleted successfully" })
  @ApiBadRequestResponse({
    description: "An error occurred deleting medication",
  })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      return await this.medicationsService.remove(id);
    } catch (error) {
      throw new HttpException(
        "An error occurred deleting medication",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
