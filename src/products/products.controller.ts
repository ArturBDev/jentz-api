import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Products } from "./entities/products.entity";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: 200, type: CreateProductsDto })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred creating product",
  })
  create(
    @Body() createProductDto: CreateProductsDto
  ): Promise<CreateProductsDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: Products, isArray: true })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred fetching products",
  })
  findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: Products })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred fetching product",
  })
  findOne(@Param("id") id: string): Promise<Products> {
    return this.productsService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: UpdateProductsDto })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred updating product",
  })
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductsDto
  ): Promise<CreateProductsDto> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(":id")
  @ApiOkResponse({ status: 200, description: "Product deleted successfully" })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred deleting product",
  })
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
