import { Module } from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { MedicationsController } from "./medications.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
