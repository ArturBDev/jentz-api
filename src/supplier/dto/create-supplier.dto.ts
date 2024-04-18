import { IsDateString, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsString()
  contactInfo: string;
  @IsDateString()
  createdAt?: Date;
  @IsDateString()
  updatedAt?: Date;
}
