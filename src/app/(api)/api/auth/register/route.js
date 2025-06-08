import connectDB from "@/lib/db";
import { Student } from "@/models/Student";
import { User } from "@/models/User";
import { message } from "antd";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (request) => {

    const user = await request.json();
    const { firstName, lastName, email, phone, password, year, speciality} = user;
    console.log(user)

    await connectDB();

    try {
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return NextResponse.json({error: "User already exist!"}, {
                status: 400,
            });
        }

        const hashedPassword = await hash(password, 12)

        const newUser = await User.create({ firstName, lastName, email, phone,  password: hashedPassword })
        await Student.create({ userId: newUser?._id, year, speciality })

        return NextResponse.json({message: "User created successfully!!"}, {
            status: 201,
        });
    } catch (e) {
        return NextResponse.json({error: e.message}, {
            status: 500,
        });
    }
}