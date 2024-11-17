import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...");

  await prisma.currency.createMany({
    data: [
      {
        id: "1",
        name: "Indonesian Rupiah",
        code: "IDR",
        symbol: "Rp",
        exchangeRate: 1.0,
        isDefault: true,
      },
      {
        id: "2",
        name: "US Dollar",
        code: "USD",
        symbol: "$",
        exchangeRate: 15860.91,
        isDefault: false,
      },
      {
        id: "3",
        name: "Japanese Yen",
        code: "JPY",
        symbol: "¥",
        exchangeRate: 102.26,
        isDefault: false,
      },
    ],
  });

  console.log("Currencies successfully seeded.");

  await prisma.category.createMany({
    data: [
      { id: "1", name: "Electronics" },
      { id: "2", name: "Books" },
      { id: "3", name: "Furniture" },
    ],
  });

  console.log("Categories successfully seeded.");

  await prisma.item.createMany({
    data: [
      {
        id: "1",
        name: "Laptop",
        quantity: 10,
        purchasePrice: 10000000,
        sellingPrice: 12000000,
        description: "High-performance laptop",
        categoryId: "1",
        currencyId: "1",
      },
      {
        id: "2",
        name: "Smartphone",
        quantity: 25,
        purchasePrice: 5000000,
        sellingPrice: 6500000,
        description: "Latest model smartphone",
        categoryId: "1",
        currencyId: "1",
      },
      {
        id: "3",
        name: "Bookshelf",
        quantity: 15,
        purchasePrice: 200000,
        sellingPrice: 300000,
        description: "Wooden bookshelf",
        categoryId: "3",
        currencyId: "1",
      },
    ],
  });

  console.log("Items successfully seeded.");

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
