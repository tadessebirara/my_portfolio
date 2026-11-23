import { Router } from "express";
import validator from "validator";

import { contactLimiter } from "../middleware/rateLimiter.js";
import { ApiError } from "../middleware/errorHandler.js";
import { supabase } from "../config/supabase.js";
import { sendContactEmail } from "../services/emailService.js";
import { sendTelegramNotification } from "../services/telegramService.js";

const router = Router();

const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  projectTypeMax: 150,
  budgetMax: 100,
  messageMin: 10,
  messageMax: 5000,
};

router.post("/", contactLimiter, async (req, res, next): Promise<void> => {
  const requestStart = performance.now();

  try {
    const body = req.body ?? {};

    // 1. Honeypot spam protection
    if (body.website) {
      res.status(200).json({
        success: true,
        message: "Thank you.",
      });
      return;
    }

    // 2. Extract inputs
    const { name, email, projectType, budget, message, agreement } = body;

    // 3. Validate required field types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      throw new ApiError(400, "Name, email, and message are required.");
    }

    // 4. Normalize inputs
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (
      projectType !== undefined &&
      projectType !== null &&
      typeof projectType !== "string"
    ) {
      throw new ApiError(400, "Project type must be valid text.");
    }

    if (budget !== undefined && budget !== null && typeof budget !== "string") {
      throw new ApiError(400, "Budget must be valid text.");
    }

    const cleanProjectType =
      typeof projectType === "string" ? projectType.trim() : "";

    const cleanBudget = typeof budget === "string" ? budget.trim() : "";

    // 5. Required fields
    if (!cleanName || !cleanEmail || !cleanMessage) {
      throw new ApiError(400, "Name, email, and message are required.");
    }

    // 6. Name validation
    if (
      cleanName.length < LIMITS.nameMin ||
      cleanName.length > LIMITS.nameMax
    ) {
      throw new ApiError(
        400,
        `Name must be between ${LIMITS.nameMin} and ${LIMITS.nameMax} characters.`,
      );
    }

    // 7. Email validation
    if (cleanEmail.length > LIMITS.emailMax || !validator.isEmail(cleanEmail)) {
      throw new ApiError(400, "Please provide a valid email address.");
    }

    // 8. Project type validation
    if (cleanProjectType.length > LIMITS.projectTypeMax) {
      throw new ApiError(
        400,
        `Project type must not exceed ${LIMITS.projectTypeMax} characters.`,
      );
    }

    // 9. Budget validation
    if (cleanBudget.length > LIMITS.budgetMax) {
      throw new ApiError(
        400,
        `Budget must not exceed ${LIMITS.budgetMax} characters.`,
      );
    }

    // 10. Message validation
    if (
      cleanMessage.length < LIMITS.messageMin ||
      cleanMessage.length > LIMITS.messageMax
    ) {
      throw new ApiError(
        400,
        `Message must be between ${LIMITS.messageMin} and ${LIMITS.messageMax} characters.`,
      );
    }

    // 11. Agreement validation
    if (agreement !== true) {
      throw new ApiError(
        400,
        "You must accept the project discussion agreement.",
      );
    }

    // 12. Prepare validated payload
    const payload = {
      name: cleanName,
      email: validator.normalizeEmail(cleanEmail) || cleanEmail,
      projectType: cleanProjectType || undefined,
      budget: cleanBudget || undefined,
      message: cleanMessage,
      agreement: true,
    };

    console.log("[Contact] Processing new inquiry...");

    // 13. Save inquiry to Supabase FIRST
    const { error: databaseError } = await supabase
      .from("contact_inquiries")
      .insert({
        name: payload.name,
        email: payload.email,
        project_type: payload.projectType ?? null,
        budget: payload.budget ?? null,
        message: payload.message,
        agreement: payload.agreement,
      });

    if (databaseError) {
      console.error("[Contact] Database save failed:", databaseError.message);

      throw new ApiError(
        500,
        "We could not save your inquiry. Please try again later.",
      );
    }

    console.log("[Contact] Inquiry saved successfully.");

    // 14. Send email notification in the background
    // Email failure must not undo the saved inquiry.
    void sendContactEmail(payload)
      .then(() => {
        console.log("[Contact] Email notification sent.");
      })
      .catch((error: unknown) => {
        console.error(
          "[Contact] Email notification failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
      });

    // 15. Send Telegram notification in the background
    void sendTelegramNotification(payload).catch((error: unknown) => {
      console.error(
        "[Contact] Telegram notification failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
    });

    // 16. Return success after database confirmation
    console.log(
      `[Contact] Request completed in ${(performance.now() - requestStart).toFixed(0)}ms`,
    );

    res.status(200).json({
      success: true,
      message:
        "Your inquiry has been received successfully. I'll respond within 24 hours.",
    });
  } catch (error) {
    console.error(
      `[Contact] Request failed after ${(performance.now() - requestStart).toFixed(0)}ms`,
    );

    next(error);
  }
});

export default router;
