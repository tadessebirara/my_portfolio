import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const {
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_SMTP_USER,
  EMAIL_SMTP_PASS,
  EMAIL_TO,
  EMAIL_FROM,
} = process.env;

async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (
    !EMAIL_SMTP_HOST ||
    !EMAIL_SMTP_PORT ||
    !EMAIL_SMTP_USER ||
    !EMAIL_SMTP_PASS ||
    !EMAIL_TO
  ) {
    throw new Error("Missing email provider configuration.");
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_SMTP_HOST,
    port: Number(EMAIL_SMTP_PORT),
    secure: Number(EMAIL_SMTP_PORT) === 465,
    auth: {
      user: EMAIL_SMTP_USER,
      pass: EMAIL_SMTP_PASS,
    },
  });

  const fromAddress = EMAIL_FROM || EMAIL_SMTP_USER;

  await transporter.sendMail({
    from: fromAddress,
    to: EMAIL_TO,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div>
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  ) {
    return NextResponse.json(
      { error: "Please complete all fields." },
      { status: 400 },
    );
  }

  if (!body.name.trim() || !body.email.trim() || !body.message.trim()) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent. I will respond soon.",
    });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      {
        error: "Unable to send your message right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
