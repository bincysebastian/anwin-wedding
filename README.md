# Anwin & Bia — Wedding Website

Editorial wedding invitation site built with Next.js, Tailwind CSS, and Framer Motion. Design follows the Figma file `GyEs62pvWbrwb1CTL2JT3l` (desktop + mobile frames); motion references the [Wedfully Framer template](https://wonderful-simplicity-839879.framer.app/).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## RSVP → Google Forms → Excel

Guest RSVPs are posted from the browser directly to a **Google Form** (no backend, no Google Cloud billing), so the site can be hosted as plain static files. The `NEXT_PUBLIC_*` values are baked in at build time; rebuild after changing them.

The project is wired to [Anwin and Bia RSVPs](https://docs.google.com/forms/d/1675AYNG86Yl2a8bH1n7pcxKNm1Am7UYmWnMLhRbWBG8/edit) via `.env.local` (see `.env.example` for variable names). Local dev picks up `.env.local` automatically; production needs the same variables in the host dashboard.

### Spreadsheet and Excel export

1. In the Google Form, open **Responses** → **Link to Sheets** (create or choose a spreadsheet). Each RSVP becomes a new row; Google adds a timestamp column.
2. Open that spreadsheet → **File** → **Download** → **Microsoft Excel (.xlsx)** whenever you want an Excel copy.

### Optional: dietary answers in the sheet

The website asks for dietary requirements, but the form does not include that question yet. To store it, add a **Paragraph** question named “Dietary requirements” to the form, copy its `entry.` id from a pre-filled link, and set `NEXT_PUBLIC_GF_ENTRY_DIETARY` in `.env.local` (and on the host).

### Changing or recreating the form

If you replace the form, match these answer labels exactly (the API sends them as-is):

- Attending: `Yes` / `No`
- Total headcount (`NEXT_PUBLIC_GF_ENTRY_HEADCOUNT`): a number — total family members attending including the guest (1–20), `0` when declined
- Additional guest (optional, legacy `NEXT_PUBLIC_GF_ENTRY_PLUS_ONE`): `Yes` when headcount is above 1, otherwise `No`
- Side: `Bia's Side` / `Anwin's Side` / `Both Sides`

Use **Get pre-filled link** to discover new `entry.*` ids and update `NEXT_PUBLIC_GOOGLE_FORM_ID` (from `https://docs.google.com/forms/d/e/{id}/viewform`) and the `NEXT_PUBLIC_GF_ENTRY_*` values. Restart `npm run dev` after changes.

## Images

All photos and icons in `public/images/figma/` are exported from the Figma file, so crops and positions match the design. Copy and image paths live in `lib/content.ts`.

## Deploy

Deploy to Vercel (or any Node host). Add the same environment variables in the hosting dashboard.

```bash
npm run build
npm start
```
