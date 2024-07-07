import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  contactInfo: string;
}
