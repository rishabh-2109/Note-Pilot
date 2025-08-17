import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendSummary = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to) return res.status(400).json({ error: "Recipient email is required" });
    if (!subject) return res.status(400).json({ error: "Email subject is required" });
    if (!text) return res.status(400).json({ error: "Email body is required" });

    const msg = {
      to,
      from: process.env.EMAIL_FROM,
      subject,
      text,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Email sent successfully!" });

  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};
