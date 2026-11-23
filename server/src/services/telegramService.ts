import { env } from "../config/env.js";

type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
};

export async function sendTelegramNotification(
  data: ContactPayload,
): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return;
  }

  const text = [
    "🚨 NEW PORTFOLIO LEAD",
    "",
    `👤 Name: ${data.name}`,
    `📧 Email: ${data.email}`,
    data.projectType ? `💼 Project: ${data.projectType}` : "",
    data.budget ? `💰 Budget: ${data.budget}` : "",
    "",
    "📝 Message:",
    `${data.message.slice(0, 300)}${data.message.length > 300 ? "..." : ""}`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
      }),
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      console.error(
        "Telegram notification failed with status:",
        response.status,
      );
    }
  } catch (error) {
    console.error(
      "Telegram notification failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}
