import nodemailer from "nodemailer";
import { env } from "../config/env.js";

/* ============================================================
   SMTP TRANSPORTER
   ============================================================ */

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465,

  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },

  // Reuse SMTP connections
  pool: true,
  maxConnections: 3,
  maxMessages: 100,

  // Connection timeouts
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

/* ============================================================
   VERIFY EMAIL CONNECTION
   ============================================================ */

export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();

    console.log("Email service ready.");

    return true;
  } catch (error) {
    console.error(
      "Email service verification failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return false;
  }
}

/* ============================================================
   CONTACT PAYLOAD
   ============================================================ */

export type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
  agreement: boolean;
};

/* ============================================================
   HTML ESCAPING
   ============================================================ */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ============================================================
   SEND CONTACT EMAIL
   ============================================================ */

export async function sendContactEmail(data: ContactPayload): Promise<string> {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeProjectType = data.projectType ? escapeHtml(data.projectType) : "";
  const safeBudget = data.budget ? escapeHtml(data.budget) : "";
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #090D16;
          padding: 32px 16px;
          margin: 0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #0D1322;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          padding: 32px;
          text-align: center;
        }

        .header h1 {
          color: white;
          margin: 0;
          font-size: 22px;
        }

        .content {
          padding: 32px;
          color: #e2e8f0;
        }

        .row {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .row:last-child {
          border-bottom: none;
        }

        .label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .value {
          color: #f8fafc;
          font-size: 15px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .footer {
          padding: 20px 32px;
          background: rgba(0,0,0,0.3);
          color: #64748b;
          font-size: 12px;
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }

        .badge-yes {
          background: rgba(16,185,129,0.15);
          color: #34d399;
          border: 1px solid rgba(16,185,129,0.3);
        }
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
            <div class="value"><strong>${safeName}</strong></div>
            <div class="value" style="color:#38bdf8;">
              ${safeEmail}
            </div>
          </div>

          ${
            safeProjectType
              ? `
                <div class="row">
                  <div class="label">Project Type</div>
                  <div class="value">${safeProjectType}</div>
                </div>
              `
              : ""
          }

          ${
            safeBudget
              ? `
                <div class="row">
                  <div class="label">Budget Range</div>
                  <div class="value">${safeBudget}</div>
                </div>
              `
              : ""
          }

          <div class="row">
            <div class="label">Message</div>
            <div class="value">${safeMessage}</div>
          </div>

          <div class="row">
            <div class="label">Scoping Agreement</div>
            <div class="value">
              <span class="badge badge-yes">
                ✓ Accepted
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

  const startTime = performance.now();

  console.log("[Email] Sending contact inquiry...");

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Inquiry" <${env.EMAIL_USER}>`,
      to: env.RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `New Lead: ${data.name} — ${data.projectType || "General Inquiry"}`,
      html,
      text: [
        "New Portfolio Inquiry",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Project: ${data.projectType || "General Inquiry"}`,
        `Budget: ${data.budget || "Not specified"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    console.log(
      `[Email] Accepted in ${(performance.now() - startTime).toFixed(0)}ms`,
    );

    return info.messageId;
  } catch (error) {
    console.error(
      `[Email] Failed after ${(performance.now() - startTime).toFixed(0)}ms`,
      error instanceof Error ? error.message : "Unknown error",
    );

    throw error;
  }
}
