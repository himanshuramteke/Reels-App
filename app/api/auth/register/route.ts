import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if(!email || !password) {
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        await connectDB();

        const existingUser = await User.findOne({ email })
        if(existingUser) {
             return NextResponse.json(
                {error: "User already registered"},
                {status: 400}
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message: "User registered successfully"},
            { status: 400}
        );

    } catch (error) {
        console.error("Error in registration", error);
        return NextResponse.json(
            { error: "Failed to register User"},
            { status: 400 }
        )
                
    }
}