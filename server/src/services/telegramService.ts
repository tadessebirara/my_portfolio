import { env } from "../config/env.js";

type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
};

export async function sendTelegramNotification(data: ContactPayload) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return; // Silent skip if not configured
  }

  const text = `
🚨 *New Portfolio Lead*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
${data.projectType ? `💼 *Project:* ${data.projectType}\n` : ""}${data.budget ? `💰 *Budget:* ${data.budget}\n` : ""}
📝 *Message:*
${data.message.slice(0, 300)}${data.message.length > 300 ? "..." : ""}
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (error) {
    console.error("Telegram notification failed:", error);
  }
}
