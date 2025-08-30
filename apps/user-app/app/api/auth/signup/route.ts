import db from "@repo/db/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;
    //Validate the required feilds
    if (!name || !email || !phone || !password) {
      NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists by email
    const existingUserByEmail = await db.user.findFirst({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Check if user already exists by phone number
    const existingUserByPhone = await db.user.findFirst({
      where: { number: phone },
    });

    if (existingUserByPhone) {
      return NextResponse.json(
        { message: "User with this phone number already exists" },
        { status: 409 }
      );
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        number: phone,
        password: hashedPassword,
        balance: {
          create: {
            amount: 0,
            locked: 0,
          },
        },
      },
    });

    // Return success response (without password)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          number: newUser.number,
        },
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error creating user:", e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
