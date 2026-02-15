import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body
        const validatedData = contactSchema.parse(body);

        // Send email using Resend
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Use Resend's test domain or your verified domain
            to: "dewandameena1098@gmail.com",
            replyTo: validatedData.email,
            subject: `Portfolio Contact: Message from ${validatedData.name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .field { margin-bottom: 20px; }
                        .label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
                        .value { color: #1f2937; }
                        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
                        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0;">New Contact Form Submission</h1>
                            <p style="margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">Name:</div>
                                <div class="value">${validatedData.name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div class="message-box">${validatedData.message.replace(/\n/g, '<br>')}</div>
                            </div>
                            <div class="footer">
                                <p>This message was sent from your portfolio contact form.</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid form data", details: error.issues },
                { status: 400 }
            );
        }

        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
