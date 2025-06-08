import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();

    const { invoice_number, status } = body;

    if (status === "paid") {
      const userId = invoice_number.split("-")[1];

      await connectDB();

      await User.findByIdAndUpdate(userId, { status: "paid" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
