/*
  Warnings:

  - You are about to drop the column `supplierId` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the `_ProductMedication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicationId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductMedication" DROP CONSTRAINT "_ProductMedication_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductMedication" DROP CONSTRAINT "_ProductMedication_B_fkey";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "supplierId",
ADD COLUMN     "primarySupplierId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "medicationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductMedication";

-- CreateIndex
CREATE INDEX "idx_medication_primary_supplier" ON "Medication"("primarySupplierId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_primarySupplierId_fkey" FOREIGN KEY ("primarySupplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
