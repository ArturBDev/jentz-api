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
import { SupplierService } from "./supplier.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Supplier } from "./entities/supplier.entity";

@ApiTags("supplier")
@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: Supplier,
    description: "Supplier created successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred creating supplier",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createSupplierDto: CreateSupplierDto
  ): Promise<Supplier> {
    try {
      return await this.supplierService.create(createSupplierDto);
    } catch (error) {
      throw new HttpException(
        "An error occurred creating supplier",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Supplier,
    isArray: true,
    description: "Suppliers retrieved successfully",
  })
  async findAll(): Promise<Supplier[]> {
    try {
      return await this.supplierService.findAll();
    } catch (error) {
      throw new HttpException(
        "An error occurred retrieving suppliers",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    type: Supplier,
    description: "Supplier retrieved successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred fetching supplier",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Supplier> {
    try {
      const supplier = await this.supplierService.findOne(id);
      if (!supplier) {
        throw new HttpException(
          `Supplier with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      }
      return supplier;
    } catch (error) {
      throw new HttpException(
        "An error occurred fetching supplier",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    type: Supplier,
    description: "Supplier updated successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred updating supplier",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto
  ): Promise<Supplier> {
    try {
      const supplier = await this.supplierService.update(id, updateSupplierDto);
      if (!supplier) {
        throw new HttpException(
          `Supplier with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      }
      return supplier;
    } catch (error) {
      throw new HttpException(
        "An error occurred updating supplier",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(":id")
  @ApiOkResponse({
    status: 200,
    description: "Supplier deleted successfully",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred deleting supplier",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    try {
      const result = await this.supplierService.remove(id);
      if (!result) {
        throw new HttpException(
          `Supplier with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      throw new HttpException(
        "An error occurred deleting supplier",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
