import { ApiProperty } from "@nestjs/swagger";
import { Supplier } from "@prisma/client";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
} from "class-validator";

export class Medication {
  @IsString()
  @ApiProperty()
  name: string;
  @IsObject()
  @ApiProperty()
  supplier: Supplier;
  @IsNumber()
  @ApiProperty()
  supplierId: number;
  @IsString()
  @ApiProperty()
  dosage?: string;
  @IsString()
  @ApiProperty()
  sideEffects?: string;
  @IsBoolean()
  @ApiProperty()
  prescriptionRequired: boolean;
  @IsDateString()
  @ApiProperty()
  createdAt?: Date;
  @IsDateString()
  @ApiProperty()
  updatedAt?: Date;
  @IsNumber()
  @ApiProperty()
  medicationId: number;
}
