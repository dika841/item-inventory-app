import prisma from "@/libs/prisma-client/prisma-client";

export const GET = async () => {
  try {
    const data = await prisma.item.findMany({
      include: {
        category: true,
        currency: true,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all items", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const data = await prisma.item.create({
      data: body,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create item", { status: 500 });
  }
};
