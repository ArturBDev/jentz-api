import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class Supplier {
  @IsNumber()
  @ApiProperty()
  id: number;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  contactInfo: string;
  @IsDateString()
  @ApiProperty()
  createdAt: Date;
  @IsDateString()
  @ApiProperty()
  updatedAt: Date;
}
