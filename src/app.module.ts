import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { MedicationsModule } from "./medications/medications.module";
import { SupplierModule } from "./supplier/supplier.module";

@Module({
  imports: [PrismaModule, ProductsModule, MedicationsModule, SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
