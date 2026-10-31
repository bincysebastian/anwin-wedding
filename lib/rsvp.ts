export type RsvpBody = {
  attending: "yes" | "no" | null;
  firstName: string;
  lastName: string;
  mobile: string;
  guests: string;
  side: "bia" | "anwin" | "both" | null;
  dietary: string;
};

// NEXT_PUBLIC_* values are inlined at build time, so they must be referenced literally.
const formId = process.env.NEXT_PUBLIC_GOOGLE_FORM_ID;
const requiredEntries = {
  attending: process.env.NEXT_PUBLIC_GF_ENTRY_ATTENDING,
  firstName: process.env.NEXT_PUBLIC_GF_ENTRY_FIRST_NAME,
  lastName: process.env.NEXT_PUBLIC_GF_ENTRY_LAST_NAME,
  mobile: process.env.NEXT_PUBLIC_GF_ENTRY_MOBILE,
  side: process.env.NEXT_PUBLIC_GF_ENTRY_SIDE,
};
const dietaryEntry = process.env.NEXT_PUBLIC_GF_ENTRY_DIETARY;
const headcountEntry = process.env.NEXT_PUBLIC_GF_ENTRY_HEADCOUNT;
const plusOneEntry = process.env.NEXT_PUBLIC_GF_ENTRY_PLUS_ONE;

export async function submitRsvp(body: RsvpBody) {
  if (!body.attending || !body.firstName.trim() || !body.lastName.trim() || !body.mobile.trim()) {
    throw new Error("Missing required fields");
  }

  const attending = body.attending === "yes";
  const headcount = attending ? Number(body.guests) : 0;
  if (attending && (!Number.isInteger(headcount) || headcount < 1 || headcount > 20)) {
    throw new Error("Please enter the total members attending (1–20)");
  }

  if (!formId || Object.values(requiredEntries).some((v) => !v)) {
    throw new Error("RSVP is not configured. Add NEXT_PUBLIC_GOOGLE_FORM_ID and NEXT_PUBLIC_GF_ENTRY_* variables (see README).");
  }

  const params = new URLSearchParams();
  params.set(requiredEntries.attending!, attending ? "Yes" : "No");
  params.set(requiredEntries.firstName!, body.firstName.trim());
  params.set(requiredEntries.lastName!, body.lastName.trim());
  params.set(requiredEntries.mobile!, body.mobile.trim());
  if (plusOneEntry) {
    params.set(plusOneEntry, headcount > 1 ? "Yes" : "No");
  }
  if (headcountEntry) {
    params.set(headcountEntry, String(headcount));
  }
  if (body.side) {
    const sideLabel =
      body.side === "bia" ? "Bia's Side" : body.side === "anwin" ? "Anwin's Side" : "Both Sides";
    params.set(requiredEntries.side!, sideLabel);
  }
  if (dietaryEntry && body.dietary.trim()) {
    params.set(dietaryEntry, body.dietary.trim());
  }

  // Google Forms sends no CORS headers, so the response is opaque; only network failures are detectable.
  await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
}
