import { Product, Supplier } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
  isDateString,
} from "class-validator";

export class CreateMedicationDto {
  @IsString()
  name: string;
  @IsArray()
  products: Product[];
  @IsObject()
  supplier: Supplier;
  @IsNumber()
  supplierId: number;
  @IsString()
  dosage?: string;
  @IsString()
  sideEffects?: string;
  @IsBoolean()
  prescriptionRequired: boolean;
  @IsDateString()
  createdAt?: Date;
  @IsDateString()
  updatedAt?: Date;
}
