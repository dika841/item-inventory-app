import prisma from "@/libs/prisma-client/prisma-client";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const data = await prisma.item.findUnique({
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
  }
};
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const body = await request.json();
    const data = await prisma.item.update({
      where: {
        id: id,
      },
      data: body,
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update item", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const data = await prisma.item.delete({
      where: {
        id: id,
      },
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete item", { status: 500 });
  }
};
