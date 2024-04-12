// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Create a supplier
  const supplier = await prisma.supplier.create({
    data: {
      name: "Pharmaceuticals Inc.",
      contactInfo: "info@pharmainc.com",
    },
  });

  // Create products and link to medications
  const product1 = await prisma.product.create({
    data: {
      name: "Aspirin",
      description: "Used to reduce fever and relieve mild to moderate pain",
      price: 19.99,
      category: "MEDICINE",
      medications: {
        create: {
          name: "Aspirin Tablets",
          dosage: "100mg per tablet",
          sideEffects: "Nausea, vomiting, stomach pain",
          prescriptionRequired: false,
          supplierId: supplier.id,
        },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Albuterol Inhaler",
      description:
        "Used to treat or prevent bronchospasm in people with reversible obstructive airway disease",
      price: 34.95,
      category: "MEDICINE",
      medications: {
        create: {
          name: "Albuterol Sulfate",
          dosage: "Use two inhalations every 4 to 6 hours",
          sideEffects:
            "Nervousness, shaking, headache, mouth/throat dryness or irritation",
          prescriptionRequired: true,
          supplierId: supplier.id,
        },
      },
    },
  });

  console.log({ supplier, product1, product2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
