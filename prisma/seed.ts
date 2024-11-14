// prisma/seed.ts

import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Electronic items like phones, laptops, etc.",
    },
  });

  const furniture = await prisma.category.create({
    data: {
      name: "Furniture",
      description: "Furniture items like tables, chairs, etc.",
    },
  });

  const phone = await prisma.item.create({
    data: {
      name: "Smartphone",
      sku: "ELEC-001",
      quantity: 50,
      price: 300.0,
      description: "A high-quality smartphone",
      categoryId: electronics.id,
    },
  });

  const laptop = await prisma.item.create({
    data: {
      name: "Laptop",
      sku: "ELEC-002",
      quantity: 20,
      price: 1500.0,
      description: "A high-performance laptop",
      categoryId: electronics.id,
    },
  });

  const chair = await prisma.item.create({
    data: {
      name: "Office Chair",
      sku: "FURN-001",
      quantity: 100,
      price: 75.0,
      description: "Comfortable office chair",
      categoryId: furniture.id,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        itemId: phone.id,
        quantity: 5,
        type: TransactionType.OUT,
        remarks: "Sold 5 units of smartphone",
      },
      {
        itemId: laptop.id,
        quantity: 3,
        type: TransactionType.OUT,
        remarks: "Sold 3 units of laptop",
      },
      {
        itemId: chair.id,
        quantity: 10,
        type: TransactionType.IN,
        remarks: "Received 10 new office chairs",
      },
      {
        itemId: chair.id,
        quantity: 5,
        type: TransactionType.OUT,
        remarks: "Sold 5 office chairs",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
