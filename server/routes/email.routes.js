import express from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(
  __dirname,
  "../public/email-templates/emailTemplate.html"
);

const router = express.Router();

// Function to send email with improved error handling
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use app password if 2FA is enabled
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw error for better error handling in routes
  }
};

router.post("/send", async (req, res) => {
  const {
    email,
    reservationName,
    reservationDate,
    startTime,
    endTime,
    services,
    note,
  } = req.body;

  try {
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders with reservation data
    htmlContent = htmlContent.replace(/{reservationName}/g, reservationName);
    htmlContent = htmlContent.replace("{reservationDate}", reservationDate);
    htmlContent = htmlContent.replace("{startTime}", startTime);
    htmlContent = htmlContent.replace("{endTime}", endTime);

    // Format services into a list
    const servicesList = services
      .map((service) => `<li>${service.name} (${service.duration} menit)</li>`)
      .join("");
    htmlContent = htmlContent.replace("{services}", servicesList);

    // Insert note if present
    const noteSection = note
      ? `<li><strong>Catatan Tambahan:</strong> ${note}</li>`
      : "";
    htmlContent = htmlContent.replace("{note}", noteSection);

    await sendEmail(
      email,
      "Reservasi Anda di Nesya Salon telah Dikonfirmasi!",
      htmlContent
    );
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error handling email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export default router;
