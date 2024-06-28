/*
  Warnings:

  - You are about to drop the column `primarySupplierId` on the `Medication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_primarySupplierId_fkey";

-- DropIndex
DROP INDEX "idx_medication_primary_supplier";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "primarySupplierId";

-- CreateTable
CREATE TABLE "MedicationSupplier" (
    "medicationId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "MedicationSupplier_pkey" PRIMARY KEY ("medicationId","supplierId")
);

-- AddForeignKey
ALTER TABLE "MedicationSupplier" ADD CONSTRAINT "MedicationSupplier_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationSupplier" ADD CONSTRAINT "MedicationSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
