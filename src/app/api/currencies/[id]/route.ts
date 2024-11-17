import prisma from "@/libs/prisma-client/prisma-client";

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id } = params;
  try {
    const data = await prisma.currency.findUnique({
      where: {
        id: id,
      },
    });
    if (!data) {
      return new Response("Item not found", { status: 404 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch item", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
export const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const { id } = params;
  try {
    const body = await request.json();
    const data = await prisma.currency.update({
      where: {
        id: id,
      },
      data: body,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed to update currency", { status: 500 });
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    const { id } = params;
    const data = await prisma.currency.delete({
      where: {
        id: id,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete currency", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
