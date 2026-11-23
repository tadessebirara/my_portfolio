import { Router } from "express";
import validator from "validator";

import { contactLimiter } from "../middleware/rateLimiter.js";
import { ApiError } from "../middleware/errorHandler.js";
import { sendContactEmail } from "../services/emailService.js";
import { sendTelegramNotification } from "../services/telegramService.js";

const router = Router();

/* ============================================================
   VALIDATION LIMITS
   ============================================================ */

const LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  projectTypeMax: 150,
  budgetMax: 100,
  messageMin: 10,
  messageMax: 5000,
};

/* ============================================================
   CONTACT FORM ROUTE
   POST /api/contact
   ============================================================ */

router.post("/", contactLimiter, async (req, res, next): Promise<void> => {
  const requestStart = performance.now();

  try {
    const body = req.body ?? {};

    /* --------------------------------------------------------
       1. HONEYPOT
       -------------------------------------------------------- */

    if (body.website) {
      res.status(200).json({
        success: true,
        message: "Thank you.",
      });

      return;
    }

    /* --------------------------------------------------------
       2. EXTRACT INPUTS
       -------------------------------------------------------- */

    const { name, email, projectType, budget, message, agreement } = body;

    /* --------------------------------------------------------
       3. REQUIRED FIELD TYPES
       -------------------------------------------------------- */

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      throw new ApiError(400, "Name, email, and message are required.");
    }

    /* --------------------------------------------------------
       4. NORMALIZE INPUTS
       -------------------------------------------------------- */

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

    /* --------------------------------------------------------
       5. REQUIRED FIELDS
       -------------------------------------------------------- */

    if (!cleanName || !cleanEmail || !cleanMessage) {
      throw new ApiError(400, "Name, email, and message are required.");
    }

    /* --------------------------------------------------------
       6. NAME VALIDATION
       -------------------------------------------------------- */

    if (
      cleanName.length < LIMITS.nameMin ||
      cleanName.length > LIMITS.nameMax
    ) {
      throw new ApiError(
        400,
        `Name must be between ${LIMITS.nameMin} and ${LIMITS.nameMax} characters.`,
      );
    }

    /* --------------------------------------------------------
       7. EMAIL VALIDATION
       -------------------------------------------------------- */

    if (cleanEmail.length > LIMITS.emailMax || !validator.isEmail(cleanEmail)) {
      throw new ApiError(400, "Please provide a valid email address.");
    }

    /* --------------------------------------------------------
       8. PROJECT TYPE VALIDATION
       -------------------------------------------------------- */

    if (cleanProjectType.length > LIMITS.projectTypeMax) {
      throw new ApiError(
        400,
        `Project type must not exceed ${LIMITS.projectTypeMax} characters.`,
      );
    }

    /* --------------------------------------------------------
       9. BUDGET VALIDATION
       -------------------------------------------------------- */

    if (cleanBudget.length > LIMITS.budgetMax) {
      throw new ApiError(
        400,
        `Budget must not exceed ${LIMITS.budgetMax} characters.`,
      );
    }

    /* --------------------------------------------------------
       10. MESSAGE VALIDATION
       -------------------------------------------------------- */

    if (
      cleanMessage.length < LIMITS.messageMin ||
      cleanMessage.length > LIMITS.messageMax
    ) {
      throw new ApiError(
        400,
        `Message must be between ${LIMITS.messageMin} and ${LIMITS.messageMax} characters.`,
      );
    }

    /* --------------------------------------------------------
       11. AGREEMENT VALIDATION
       -------------------------------------------------------- */

    if (agreement !== true) {
      throw new ApiError(
        400,
        "You must accept the project discussion agreement.",
      );
    }

    /* --------------------------------------------------------
       12. PREPARE PAYLOAD
       -------------------------------------------------------- */

    const payload = {
      name: cleanName,
      email: validator.normalizeEmail(cleanEmail) || cleanEmail,
      projectType: cleanProjectType || undefined,
      budget: cleanBudget || undefined,
      message: cleanMessage,
      agreement: true,
    };

    /* --------------------------------------------------------
       13. SEND EMAIL
       -------------------------------------------------------- */

    console.log("[Contact] Processing new inquiry...");

    await sendContactEmail(payload);

    /* --------------------------------------------------------
       14. START TELEGRAM NOTIFICATION
       -------------------------------------------------------- */

    // Do not wait for Telegram.
    // Telegram failures must not affect successful email delivery.

    void sendTelegramNotification(payload).catch(() => {
      console.error("[Contact] Telegram notification failed.");
    });

    /* --------------------------------------------------------
       15. SUCCESS RESPONSE
       -------------------------------------------------------- */

    console.log(
      `[Contact] Request completed in ${(performance.now() - requestStart).toFixed(0)}ms`,
    );

    res.status(200).json({
      success: true,
      message:
        "Your inquiry was sent successfully. I'll respond within 24 hours.",
    });
  } catch (error) {
    console.error(
      `[Contact] Request failed after ${(performance.now() - requestStart).toFixed(0)}ms`,
    );

    next(error);
  }
});

export default router;
