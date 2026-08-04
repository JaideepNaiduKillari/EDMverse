import { NextRequest, NextResponse } from "next/server";
import { appendWaitlistRow } from "@/lib/googleSheets";
import { sendWaitlistConfirmation } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { name?: string; country?: string; email?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const country = (body.country ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Enter a name with at least 2 characters." },
      { status: 400 }
    );
  }
  if (!country) {
    return NextResponse.json({ error: "Select your country." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const signup = await appendWaitlistRow({ name, country, email });

    try {
      await sendWaitlistConfirmation(signup);
    } catch (emailError) {
      // The signup succeeded, so don't encourage a retry that would produce a
      // duplicate. The error is retained server-side for follow-up.
      console.error("Waitlist confirmation email failed:", emailError);
    }

    return NextResponse.json(
      { ok: true, waitlistNumber: signup.waitlistNumber },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === "DUPLICATE_EMAIL") {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }
    // Log the real cause server-side (e.g. missing env vars, bad sheet
    // permissions) without leaking internals to the client.
    console.error("Waitlist submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
