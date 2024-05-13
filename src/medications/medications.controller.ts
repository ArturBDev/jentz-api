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
  ApiTags,
} from "@nestjs/swagger";
import { Medication } from "@prisma/client";
import { Medication as MedicationViewModel } from "./entities/medication.entity";

@ApiTags("medications")
@Controller("medications")
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
  create(
    @Body() createMedicationDto: CreateMedicationDto
  ): Promise<Medication> {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: MedicationViewModel,
    isArray: true,
    description: "Medications retrieved successfully",
  })
  findAll(): Promise<Medication[]> {
    return this.medicationsService.findAll();
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
  findOne(@Param("id") id: string): Promise<Medication> {
    return this.medicationsService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    type: UpdateMedicationDto,
    description: "Medication updated successfully",
  })
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
  @ApiOkResponse({ description: "Medication deleted successfully" })
  @ApiBadRequestResponse({
    description: "An error occurred deleting medication",
  })
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
