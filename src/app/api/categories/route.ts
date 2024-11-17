import prisma from "@/libs/prisma-client/prisma-client";

export const GET = async () => {
  try {
    const data = await prisma.category.findMany();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all categories", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const data = await prisma.category.create({
      data: body,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create category", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
