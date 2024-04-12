import { PartialType } from "@nestjs/swagger";
import { CreateProductsDto } from "./create-products.dto";

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
