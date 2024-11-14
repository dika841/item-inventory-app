// prisma/seed.ts

import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const electronicsCategory = await prisma.category.create({
    data: {
      name: "Electronics",
    },
  });

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: "Accessories",
    },
  });

  const laptop = await prisma.item.create({
    data: {
      name: "Laptop",
      quantity: 100,
      price: 1200.0,
      description: "High-performance laptop",
      categoryId: electronicsCategory.id,
    },
  });

  const headphones = await prisma.item.create({
    data: {
      name: "Headphones",
      quantity: 50,
      price: 150.0,
      description: "Noise-cancelling headphones",
      categoryId: accessoriesCategory.id,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        itemId: laptop.id,
        quantity: 10,
        type: TransactionType.IN,
      },
      {
        itemId: laptop.id,
        quantity: 5,
        type: TransactionType.OUT,
      },
      {
        itemId: headphones.id,
        quantity: 20,
        type: TransactionType.IN,
      },
      {
        itemId: headphones.id,
        quantity: 3,
        type: TransactionType.OUT,
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Seeding completed successfully.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error seeding database:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
