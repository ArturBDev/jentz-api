import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
} from "@nestjs/swagger";
import { Medication } from "@prisma/client";

@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiResponse({ status: 200, type: CreateMedicationDto })
  @ApiOkResponse({ description: "Medication created successfully" })
  @ApiBadRequestResponse({ description: "An error occurred" })
  create(
    @Body() createMedicationDto: CreateMedicationDto
  ): Promise<Medication> {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [CreateMedicationDto] })
  @ApiOkResponse({ description: "Medications retrieved successfully" })
  @ApiBadRequestResponse({
    description: "An error occurred getting medications",
  })
  findAll(): Promise<Medication[]> {
    return this.medicationsService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: CreateMedicationDto })
  @ApiOkResponse({ description: "Medication retrieved successfully" })
  @ApiBadRequestResponse({
    description: "An error occurred getting medication",
  })
  findOne(@Param("id") id: string): Promise<Medication> {
    return this.medicationsService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: UpdateMedicationDto })
  @ApiOkResponse({ description: "Medication updated successfully" })
  @ApiBadRequestResponse({
    description: "An error occurred updating medications",
  })
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ): Promise<Medication> {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @Delete(":id")
  @ApiResponse({ status: 200, type: CreateMedicationDto })
  @ApiOkResponse({ description: "Medication deleted successfully" })
  @ApiBadRequestResponse({
    description: "An error occurred deleting medication",
  })
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
