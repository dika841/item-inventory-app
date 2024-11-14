import prisma from "@/libs/prisma-client/prisma-client";

export const GET = async () => {
  try {
    const data = await prisma.category.findMany();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all categories", { status: 500 });
  }
};
