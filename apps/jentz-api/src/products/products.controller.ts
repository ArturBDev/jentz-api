import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
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
  @ApiResponse({
    status: 201,
    type: Products,
    description: "Product created successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred creating product",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createProductDto: CreateProductsDto): Promise<Products> {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(
        "An error occurred creating product",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Products,
    isArray: true,
    description: "Products retrieved successfully",
  })
  async findAll(): Promise<Products[]> {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(
        "An error occurred retrieving products",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: Products,
    description: "Product retrieved successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred fetching product",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Products> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new HttpException(
        "An error occurred fetching product",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    type: Products,
    description: "Product updated successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred updating product",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductsDto
  ): Promise<Products> {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException(
        "An error occurred updating product",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(":id")
  @ApiOkResponse({
    status: 200,
    description: "Product deleted successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred deleting product",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    try {
      await this.productsService.remove(id);
    } catch (error) {
      throw new HttpException(
        "An error occurred deleting product",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
