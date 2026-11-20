import { Router } from "express";
import validator from "validator";
import { contactLimiter } from "../middleware/rateLimiter.js";
import { ApiError } from "../middleware/errorHandler.js";
import { sendContactEmail } from "../services/emailService.js";
import { sendTelegramNotification } from "../services/telegramService.js";

const router = Router();

router.post("/", contactLimiter, async (req, res, next): Promise<void> => {
  try {
    const { name, email, projectType, budget, message, agreement } = req.body;

    // 1. Required fields
    if (!name || !email || !message) {
      throw new ApiError(400, "Name, email, and message are required.");
    }

    // 2. Validate email
    if (!validator.isEmail(email)) {
      throw new ApiError(400, "Please provide a valid email address.");
    }

    // 3. Validate lengths
    if (name.length < 2 || name.length > 100) {
      throw new ApiError(400, "Name must be between 2 and 100 characters.");
    }

    if (message.length < 10 || message.length > 5000) {
      throw new ApiError(
        400,
        "Message must be between 10 and 5000 characters.",
      );
    }

    // 4. Require agreement
    if (!agreement) {
      throw new ApiError(400, "You must accept the project scoping agreement.");
    }

    // 5. Honeypot spam protection
    if (req.body.website) {
      res.status(200).json({
        success: true,
        message: "Thank you.",
      });
      return;
    }

    // 6. Sanitize
    const payload = {
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email) || email,
      projectType: projectType
        ? validator.escape(projectType.trim())
        : undefined,
      budget: budget ? validator.escape(budget.trim()) : undefined,
      message: message.trim(),
      agreement: Boolean(agreement),
    };

    // 7. Send email and Telegram notification
    await Promise.all([
      sendContactEmail(payload),
      sendTelegramNotification(payload),
    ]);

    res.status(200).json({
      success: true,
      message:
        "Your inquiry was sent successfully. I'll respond within 24 hours.",
    });
    return;
  } catch (err) {
    next(err);
    return;
  }
});

export default router;
