// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Contact API is alive. Use POST with { name, email, message }."
  });
}
export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    // OVH SMTP config
    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: "contact@studio-ai.fr",   // your OVH email
        pass: process.env.OVH_MAIL_PASS, // store password in .env.local
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "contact@studio-ai.fr",
      subject: `New message from ${name}`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail send error:", err);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
