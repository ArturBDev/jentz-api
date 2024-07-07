-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('MEDICINE', 'WELLNESS', 'EQUIPMENT', 'OTHER');

-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dosage" TEXT,
ADD COLUMN     "prescriptionRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sideEffects" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "contactInfo" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
