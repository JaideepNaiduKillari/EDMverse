import nodemailer from "nodemailer";

type WaitlistEmail = {
  name: string;
  email: string;
  waitlistNumber: number;
};

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function assertConfigured(): void {
  const missing: string[] = [];
  if (!GMAIL_USER) missing.push("GMAIL_USER");
  if (!GMAIL_APP_PASSWORD) missing.push("GMAIL_APP_PASSWORD");

  if (missing.length > 0) {
    throw new Error(`Gmail is not configured. Missing env var(s): ${missing.join(", ")}.`);
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  assertConfigured();

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
  return transporter;
}

export async function sendWaitlistConfirmation({
  name,
  email,
  waitlistNumber,
}: WaitlistEmail): Promise<void> {
  const safeName = escapeHtml(name);

  await getTransporter().sendMail({
    from: `EDMVerse <${GMAIL_USER}>`,
    to: email,
    subject: `You're on the EDMVerse waitlist - #${waitlistNumber}`,
    text: `Hi ${name},\n\nThanks for joining the EDMVerse waitlist. Your waitlist number is #${waitlistNumber}.\n\nWe'll email you when EDMVerse is ready to open up.`,
    html: `
      <main style="font-family: Arial, sans-serif; color: #171717; line-height: 1.5;">
        <h1>You're on the list.</h1>
        <p>Hi ${safeName},</p>
        <p>Thanks for joining the EDMVerse waitlist. Your waitlist number is <strong>#${waitlistNumber}</strong>.</p>
        <p>We'll email you when EDMVerse is ready to open up.</p>
      </main>
    `,
  });
}
