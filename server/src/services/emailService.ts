import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

// Verify connection on boot
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("✅ Email service ready");
    return true;
  } catch (error) {
    console.error("❌ Email service failed:", error);
    return false;
  }
}

type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
  agreement: boolean;
};

export async function sendContactEmail(data: ContactPayload) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #090D16; padding: 32px 16px; margin: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #0D1322; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 22px; }
        .content { padding: 32px; color: #e2e8f0; }
        .row { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .row:last-child { border-bottom: none; }
        .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .value { color: #f8fafc; font-size: 15px; line-height: 1.6; }
        .footer { padding: 20px 32px; background: rgba(0,0,0,0.3); color: #64748b; font-size: 12px; text-align: center; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .badge-yes { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .badge-no { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Project Inquiry</h1>
        </div>
        <div class="content">
          <div class="row">
            <div class="label">From</div>
            <div class="value"><strong>${escapeHtml(data.name)}</strong></div>
            <div class="value" style="color:#38bdf8;">${escapeHtml(data.email)}</div>
          </div>
          ${
            data.projectType
              ? `<div class="row">
                  <div class="label">Project Type</div>
                  <div class="value">${escapeHtml(data.projectType)}</div>
                </div>`
              : ""
          }
          ${
            data.budget
              ? `<div class="row">
                  <div class="label">Budget Range</div>
                  <div class="value">${escapeHtml(data.budget)}</div>
                </div>`
              : ""
          }
          <div class="row">
            <div class="label">Message</div>
            <div class="value">${escapeHtml(data.message).replace(/\n/g, "<br/>")}</div>
          </div>
          <div class="row">
            <div class="label">Scoping Agreement</div>
            <div class="value">
              <span class="badge ${data.agreement ? "badge-yes" : "badge-no"}">
                ${data.agreement ? "✓ Accepted" : "✗ Not Accepted"}
              </span>
            </div>
          </div>
        </div>
        <div class="footer">
          Sent from portfolio contact form • ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `"Portfolio Inquiry" <${env.EMAIL_USER}>`,
    to: env.RECIPIENT_EMAIL,
    replyTo: data.email,
    subject: `💼 New Lead: ${data.name} — ${data.projectType || "General Inquiry"}`,
    html,
  });

  return info.messageId;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
