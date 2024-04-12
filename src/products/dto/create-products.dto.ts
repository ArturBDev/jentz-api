import { Medication, ProductCategory } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

// src/recipes/dto/create-recipe.dto.ts
export class CreateProductsDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsArray()
  medications: Medication[];

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  updatedAt?: Date;
}
