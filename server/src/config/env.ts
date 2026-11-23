import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

   
  // Supabase configuration
  SUPABASE_URL: required("SUPABASE_URL"),
  SUPABASE_SECRET_KEY: required("SUPABASE_SECRET_KEY"),

  // Email configuration
  EMAIL_HOST: required("EMAIL_HOST"),
  EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
  EMAIL_USER: required("EMAIL_USER"),
  EMAIL_PASS: required("EMAIL_PASS"),
  RECIPIENT_EMAIL: required("RECIPIENT_EMAIL"),

  // Optional Telegram configuration
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "",
};

export const isProduction = env.NODE_ENV === "production";
