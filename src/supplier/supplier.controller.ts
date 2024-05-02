import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  @ApiResponse({ status: 200, type: CreateSupplierDto })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred creating supplier",
  })
  create(
    @Body() createSupplierDto: CreateSupplierDto
  ): Promise<CreateSupplierDto> {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: Supplier, isArray: true })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred fetching suppliers",
  })
  findAll(): Promise<Supplier[]> {
    return this.supplierService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: Supplier })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred fetching supplier",
  })
  findOne(@Param("id") id: string): Promise<Supplier> {
    return this.supplierService.findOne(+id);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: UpdateSupplierDto })
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred updating supplier",
  })
  update(
    @Param("id") id: string,
    @Body() updateSupplierDto: UpdateSupplierDto
  ): Promise<Supplier> {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(":id")
  @ApiBadRequestResponse({
    status: 400,
    description: "An error occurred deleting supplier",
  })
  @ApiOkResponse({ description: "Supplier deleted successfully" })
  remove(@Param("id") id: string) {
    return this.supplierService.remove(+id);
  }
}
