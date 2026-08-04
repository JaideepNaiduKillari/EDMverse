type WaitlistEmail = {
  name: string;
  email: string;
  waitlistNumber: number;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

function assertConfigured(): void {
  const missing: string[] = [];
  if (!RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!RESEND_FROM_EMAIL) missing.push("RESEND_FROM_EMAIL");

  if (missing.length > 0) {
    throw new Error(`Resend is not configured. Missing env var(s): ${missing.join(", ")}.`);
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

export async function sendWaitlistConfirmation({
  name,
  email,
  waitlistNumber,
}: WaitlistEmail): Promise<void> {
  assertConfigured();

  const safeName = escapeHtml(name);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [email],
      subject: `You're on the EDMVerse waitlist - #${waitlistNumber}`,
      html: `
        <main style="font-family: Arial, sans-serif; color: #171717; line-height: 1.5;">
          <h1>You're on the list.</h1>
          <p>Hi ${safeName},</p>
          <p>Thanks for joining the EDMVerse waitlist. Your waitlist number is <strong>#${waitlistNumber}</strong>.</p>
          <p>We'll email you when EDMVerse is ready to open up.</p>
        </main>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend email failed (${response.status}): ${details}`);
  }
}
