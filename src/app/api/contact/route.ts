import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const schema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: 'Invalid input', errors: parsed.error.flatten().fieldErrors }, { status: 400 });
        }

        const { fullName, email, phone } = parsed.data;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

        if (adminEmails.length === 0) {
            console.error("No admin emails configured.");
            return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
        }

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: adminEmails.join(','),
            subject: 'New Contact Form Submission',
            html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'success' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
    }
}