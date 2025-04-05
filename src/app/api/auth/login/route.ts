import prisma from "@/libs/prisma-client/prisma-client";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    const user = await prisma.users.findFirst({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid Email or password" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET! as string,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      {
        message: "Login successful",
        status_code: 200,
        data: {
          access_token: token,
          expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        },
      },

      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
