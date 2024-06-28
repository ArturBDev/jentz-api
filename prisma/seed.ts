import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Medication
  const medications = await Promise.all(
    [...Array(5)].map((_, i) =>
      prisma.medication.create({
        data: {
          name: `Medication ${i + 1}`,
          dosage: `Dosage ${i + 1}`,
          sideEffects: `Side Effects ${i + 1}`,
          prescriptionRequired: i % 2 === 0,
        },
      })
    )
  );

  // Seed Suppliers
  const suppliers = await Promise.all(
    [...Array(5)].map((_, i) =>
      prisma.supplier.create({
        data: {
          name: `Supplier ${i + 1}`,
          contactInfo: `Contact Info ${i + 1}`,
        },
      })
    )
  );

  // Seed Products
  const products = await Promise.all(
    medications.map((medication, i) =>
      prisma.product.create({
        data: {
          name: `Product ${i + 1}`,
          description: `Description ${i + 1}`,
          price: 10.0 * (i + 1),
          medicationId: medication.id,
          category: "MEDICINE",
        },
      })
    )
  );

  // Seed MedicationSupplier with a many-to-many relationship
  for (const medication of medications) {
    for (const supplier of suppliers) {
      await prisma.medicationSupplier.create({
        data: {
          medicationId: medication.id,
          supplierId: supplier.id,
        },
      });
    }
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
