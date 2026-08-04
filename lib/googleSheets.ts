import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEETS_TAB_NAME || "Waitlist";
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
// Env vars can't hold real newlines cleanly, so the private key is stored
// with literal "\n" sequences and unescaped here at read time.
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);

export type WaitlistEntry = {
  name: string;
  country: string;
  email: string;
  createdAt: string;
};

function assertConfigured(): void {
  const missing: string[] = [];
  if (!SPREADSHEET_ID) missing.push("GOOGLE_SHEETS_SPREADSHEET_ID");
  if (!CLIENT_EMAIL) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!PRIVATE_KEY) missing.push("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");

  if (missing.length > 0) {
    throw new Error(
      `Google Sheets is not configured. Missing env var(s): ${missing.join(
        ", "
      )}. See README.md → "Google Sheets setup".`
    );
  }
}

let cachedClient: ReturnType<typeof google.sheets> | null = null;

function getSheetsClient() {
  if (cachedClient) return cachedClient;
  assertConfigured();

  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  cachedClient = google.sheets({ version: "v4", auth });
  return cachedClient;
}

/** Reads the existing Email column (skipping the header row) for dedupe. */
async function readWaitlistEmails(): Promise<string[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!C2:C`,
  });
  const rows = res.data.values ?? [];
  return rows.map((r) => String(r[0] ?? "").toLowerCase());
}

/**
 * Appends one row to the sheet: Name | Country | Email | Created At.
 * Throws "DUPLICATE_EMAIL" if the email is already present.
 */
export async function appendWaitlistRow(
  entry: Pick<WaitlistEntry, "name" | "country" | "email">
): Promise<WaitlistEntry> {
  const sheets = getSheetsClient();

  const existingEmails = await readWaitlistEmails();
  if (existingEmails.includes(entry.email.toLowerCase())) {
    throw new Error("DUPLICATE_EMAIL");
  }

  const createdAt = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:D`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[entry.name, entry.country, entry.email, createdAt]],
    },
  });

  return { ...entry, createdAt };
}
