import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { Medication, ProductCategory } from "@prisma/client";
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
} from "class-validator";

export class Products {
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  description?: string;
  @IsNumber()
  @ApiProperty()
  price: number;
  @IsObject()
  @ApiProperty()
  category: ProductCategory;
  @IsArray()
  @ApiProperty()
  medications?: Medication[];
  @IsDateString()
  @ApiProperty()
  createdAt?: Date;
  @IsDateString()
  @ApiProperty()
  updatedAt?: Date;
}
