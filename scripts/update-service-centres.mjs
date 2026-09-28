// Downloads the official SPARSH service-centre list and writes a cleaned copy to
// src/data/service-centres.json. Run with: npm run update:centres
import { writeFile } from "node:fs/promises";

const ORIGIN = "https://sparsh.defencepension.gov.in";
const LOCATOR = `${ORIGIN}/?page=serviceCentreLocator`;
const DATA = `${ORIGIN}/webHP?requestType=ApplicationRH&actionVal=viewAllselfSrvcs&screenId=90000253`;
const OUTPUT = new URL("../src/data/service-centres.json", import.meta.url);

/** Spelling variants found in the source, mapped to official state/UT names. */
const STATE_ALIASES = {
  MP: "MADHYA PRADESH",
  MAHARASTRA: "MAHARASHTRA",
  RAJASHTHAN: "RAJASTHAN",
  TAMILNADU: "TAMIL NADU",
  UTTRAKHAND: "UTTARAKHAND",
  "LADAKH-UT": "LADAKH",
  "ANDAMAN AND NICOBAR ISLAN": "ANDAMAN AND NICOBAR ISLANDS",
  "ANDAMAN AND NICOBAR ISLAND": "ANDAMAN AND NICOBAR ISLANDS",
};

const clean = (text) =>
  text
    .replace(/<br\s*\/?>/gi, ", ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    // The source stores some line breaks as the literal text "\n".
    .replace(/\\n/gi, " ")
    .replace(/\uFFFD/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .trim();

const titleCase = (text) =>
  text
    .toLowerCase()
    .replace(/(^|[\s(-])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase())
    .replace(/\b(And|Of)\b/g, (w) => w.toLowerCase());

function canonicalState(raw) {
  const upper = raw.toUpperCase();
  return titleCase(STATE_ALIASES[upper] ?? upper);
}

async function download() {
  const page = await fetch(LOCATOR);
  if (!page.ok) throw new Error(`Locator page returned ${page.status}`);
  const cookies = page.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");
  const csrf = (await page.text()).match(/<meta name="_csrf" content="([^"]+)"/)?.[1];
  if (!csrf) throw new Error("CSRF token not found on the locator page");
  const res = await fetch(`${DATA}&_csrf=${csrf}`, {
    method: "POST",
    headers: {
      cookie: cookies,
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
      referer: LOCATOR,
    },
    body: "portal=CAS",
  });
  if (!res.ok) throw new Error(`Service centre list returned ${res.status}`);
  return res.text();
}

function parse(html) {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((m) => [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => clean(c[1])))
    .filter((cells) => cells.length === 8);
  if (rows.length < 1000) throw new Error(`Only ${rows.length} rows parsed; the page layout may have changed`);
  const seen = new Set();
  const centres = [];
  // Columns: Sr. No., Name, Address, State, District, Pincode, Contact Person, Contact Number.
  // Contact person names are deliberately not kept.
  for (const [, rawName, address, state, district, pincode, , phone] of rows) {
    // SPARSH prefixes Defence Accounts Department offices with "DAD"; keep the
    // office name itself ("DAD SSC CHHAPRA" → "SSC CHHAPRA") and record the type.
    const isDefence = /^DAD\b/i.test(rawName);
    const name = isDefence ? rawName.replace(/^DAD\s*/i, "") : rawName;
    const key = [name, address, pincode].join("|").toUpperCase();
    if (seen.has(key)) continue;
    seen.add(key);
    centres.push({
      type: isDefence ? "defence" : "bank",
      name,
      address,
      district: titleCase(district),
      state: canonicalState(state),
      pincode: pincode.replace(/\D/g, ""),
      phone: phone === "-" ? "" : phone.replace(/\s*,\s*/g, ", "),
    });
  }
  // Defence Accounts offices first, then partner banks; each by state, district, name.
  const order = (c) => [c.type === "defence" ? 0 : 1, c.state, c.district, c.name].join("\u0000");
  return centres.sort((a, b) => order(a).localeCompare(order(b)));
}

const centres = parse(await download());
const retrievedAt = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time
// Indented so `git diff` shows exactly which centres changed between updates.
await writeFile(
  OUTPUT,
  JSON.stringify({ source: LOCATOR, retrievedAt, centres }, null, 2) + "\n",
);
const defence = centres.filter((c) => c.type === "defence").length;
console.log(`Saved ${centres.length} centres (${defence} Defence Accounts offices) from ${LOCATOR}`);
