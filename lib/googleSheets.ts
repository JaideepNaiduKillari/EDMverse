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
  waitlistNumber: number;
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

/** Reads existing signups (skipping the header row) for dedupe and numbering. */
async function readWaitlistRows(): Promise<string[][]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:E`,
  });
  return (res.data.values ?? []).map((row) => row.map(String));
}

/**
 * Appends one row to the sheet:
 * Waitlist Number | Name | Country | Email | Created At.
 * Throws "DUPLICATE_EMAIL" if the email is already present.
 */
export async function appendWaitlistRow(
  entry: Pick<WaitlistEntry, "name" | "country" | "email">
): Promise<WaitlistEntry> {
  const sheets = getSheetsClient();

  const existingRows = await readWaitlistRows();
  const emailExists = existingRows.some(
    (row) => row[3]?.trim().toLowerCase() === entry.email.toLowerCase()
  );
  if (emailExists) {
    throw new Error("DUPLICATE_EMAIL");
  }

  const highestWaitlistNumber = existingRows.reduce((highest, row) => {
    const number = Number.parseInt(row[0] ?? "", 10);
    return Number.isSafeInteger(number) && number > highest ? number : highest;
  }, 0);
  const waitlistNumber = highestWaitlistNumber + 1;
  const createdAt = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:E`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [waitlistNumber, entry.name, entry.country, entry.email, createdAt],
      ],
    },
  });

  return { ...entry, waitlistNumber, createdAt };
}
