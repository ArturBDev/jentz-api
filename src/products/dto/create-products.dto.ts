import { ApiProperty } from "@nestjs/swagger";
import { Medication, ProductCategory } from "@prisma/client";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from "class-validator";

// src/recipes/dto/create-recipe.dto.ts
export class CreateProductsDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsArray()
  @ApiProperty()
  medications?: Medication[];

  @IsEnum(ProductCategory)
  @ApiProperty()
  category: ProductCategory;

  @IsDateString()
  @ApiProperty()
  createdAt?: Date;

  @IsDateString()
  @ApiProperty()
  updatedAt?: Date;
}
