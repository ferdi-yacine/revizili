import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req) {
    try {
        const body = await req.json()

        const { userId, amount } = body

        const formData = new FormData();
        formData.append("client", "Test User");
        formData.append("client_email", "test@example.com");
        formData.append("amount", "2000"); // must be string
        formData.append("invoice_number", `INV-${Date.now()}`);
        formData.append("back_url", "http://localhost:3000/login");
        formData.append("webhook_url", "http://localhost:3000/api/chargily/webhook");
        formData.append("mode", "EDAHABIA"); // or "CIB"
        formData.append("discount", "0");
        formData.append("comment", "Test payment");

        // const payload = JSON.stringify(formData)
        const signature = crypto
        // .createHmac("sha256", process.env.CHARGILY_API_KEY_PUBLIC)
        // .update(payload)
        // .digest("hex")

        const res = await fetch("https://pay.chargily.net/test/api/v2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.CHARGILY_API_KEY_SECRE}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formData,
        })

        const data = await res.text()
        console.log("Status:", res.status);
        console.log("Raw response:", data);
        return NextResponse.json(data)

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
    }
}
