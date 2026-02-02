
"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const bookInspectionSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  state: z.string().min(2, "State is required."),
  email: z.string().email("A valid email is required."),
  date: z.string().min(1, "Please select a date."),
  time: z.string().min(1, "Please select a time."),
});

const subscribeSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  propertyOfInterest: z.string().optional(),
  budget: z.string().optional(),
  purpose: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

const buildFormSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  state: z.string().min(2, "State is required."),
  email: z.string().email("A valid email is required."),
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function bookInspection(prevState: any, formData: FormData) {
  const validatedFields = bookInspectionSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    state: formData.get("state"),
    email: formData.get("email"),
    date: formData.get("date"),
    time: formData.get("time"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  const { firstName, lastName, phone, state, email, date, time } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAILS,
    subject: 'New Inspection Booking',
    html: `
      <h1>New Inspection Booking</h1>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>
      <p><strong>Preferred Time:</strong> ${time}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "success" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { message: "Failed to send booking confirmation. Please try again later." };
  }
}

export async function subscribeInterest(prevState: any, formData: FormData) {
  const validatedFields = subscribeSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    propertyOfInterest: formData.get("propertyOfInterest"),
    budget: formData.get("budget"),
    purpose: formData.get("purpose"),
  });

  await wait(1500);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  console.log("Submitting interest with data:", validatedFields.data);

  return { message: "success" };
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  await wait(1500);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  console.log("Submitting contact form with data:", validatedFields.data);
  return { message: "success" };
}

export async function submitBuildForm(prevState: any, formData: FormData) {
  const validatedFields = buildFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    state: formData.get("state"),
    email: formData.get("email"),
  });

  await wait(1500);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  console.log("Submitting build form with data:", validatedFields.data);
  return { message: "success" };
}