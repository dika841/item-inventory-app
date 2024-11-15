import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const categories = await prisma.category.createMany({
    data: [
      { id: "1", name: "Electronics" },
      { id: "2", name: "Furniture" },
      { id: "3", name: "Stationery" },
    ],
  });

  console.log("Categories seeded:", categories);

  const currencies = await prisma.currency.createMany({
    data: [
      {
        name: "Indonesian Rupiah",
        code: "IDR",
        symbol: "Rp",
        exchangeRate: 1,
        isDefault: true,
      },
      { name: "US Dollar", code: "USD", symbol: "$", exchangeRate: 15200 },
      { name: "Euro", code: "EUR", symbol: "€", exchangeRate: 16000 },
    ],
  });

  console.log("Currencies seeded:", currencies);

  const items = await prisma.item.createMany({
    data: [
      {
        id: "1",
        name: "Laptop",
        quantity: 50,
        purchasePrice: 500,
        sellingPrice: Math.round(500 * 15200 * 1.2),
        description: "A high-end laptop",
        categoryId: "1",
        currencyId: 2,
      },
      {
        id: "2",
        name: "Office Chair",
        quantity: 20,
        purchasePrice: 300,
        sellingPrice: Math.round(300 * 15200 * 1.2),
        description: "Comfortable office chair",
        categoryId: "2",
        currencyId: 2,
      },
      {
        id: "3",
        name: "Notebook",
        quantity: 100,
        purchasePrice: 20000,
        sellingPrice: Math.round(20000 * 1.2),
        description: "A simple notebook",
        categoryId: "3",
        currencyId: 1,
      },
    ],
  });

  console.log("Items seeded:", items);

  const transactions = await prisma.transaction.createMany({
    data: [
      { id: "1", itemId: "1", quantity: 10, type: "IN" },
      { id: "2", itemId: "1", quantity: 5, type: "OUT" },
      { id: "3", itemId: "2", quantity: 20, type: "IN" },
      { id: "4", itemId: "3", quantity: 50, type: "IN" },
    ],
  });

  console.log("Transactions seeded:", transactions);
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
