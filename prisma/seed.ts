import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.users.deleteMany();

  console.log("Starting seeding...");

  const hashedAdminPassword = await hash("12345678", 12);
  const hashedUserPassword = await hash("password", 12);

  await prisma.users.createMany({
    data: [
      {
        username: "Admin",
        password: hashedAdminPassword,
        email: "admin@example.com",
      },
      {
        username: "Randika",
        password: hashedUserPassword,
        email: "randika@example.com",
      },
    ],
  });
  console.log("Users successfully seeded.");

  const currencies = await prisma.currency.createMany({
    data: [
      {
        name: "Indonesian Rupiah",
        code: "IDR",
        symbol: "Rp",
        exchangeRate: 1.0,
        isDefault: true,
      },
      {
        name: "US Dollar",
        code: "USD",
        symbol: "$",
        exchangeRate: 15860.91,
        isDefault: false,
      },
      {
        name: "Japanese Yen",
        code: "JPY",
        symbol: "¥",
        exchangeRate: 102.26,
        isDefault: false,
      },
    ],
  });
  console.log("Currencies successfully seeded.");

  const categories = await prisma.category.createMany({
    data: [{ name: "Electronics" }, { name: "Books" }, { name: "Furniture" }],
  });
  console.log("Categories successfully seeded.");

  const currency = await prisma.currency.findFirst();
  const electronicsCategory = await prisma.category.findFirst({
    where: { name: "Electronics" },
  });
  const furnitureCategory = await prisma.category.findFirst({
    where: { name: "Furniture" },
  });

  if (!currency || !electronicsCategory || !furnitureCategory) {
    throw new Error("Required seed data not found");
  }

  await prisma.item.createMany({
    data: [
      {
        name: "Laptop",
        quantity: 10,
        purchasePrice: 10000000,
        sellingPrice: 12000000,
        description: "High-performance laptop",
        categoryId: electronicsCategory.id,
        currencyId: currency.id,
        markupRate: 1.2,
      },
      {
        name: "Smartphone",
        quantity: 25,
        purchasePrice: 5000000,
        sellingPrice: 6500000,
        description: "Latest model smartphone",
        categoryId: electronicsCategory.id,
        currencyId: currency.id,
        markupRate: 1.3,
      },
      {
        name: "Bookshelf",
        quantity: 15,
        purchasePrice: 200000,
        sellingPrice: 300000,
        description: "Wooden bookshelf",
        categoryId: furnitureCategory.id,
        currencyId: currency.id,
        markupRate: 1.5,
      },
    ],
  });
  console.log("Items successfully seeded.");

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
