import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { MedicationsModule } from './medications/medications.module';

@Module({
  imports: [PrismaModule, ProductsModule, MedicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
