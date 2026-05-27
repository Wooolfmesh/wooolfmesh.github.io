import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M0 0h1200v630H0z" fill="url(#grid)"/>
  <rect x="760" y="105" width="330" height="370" rx="24" fill="#e6f3eb" stroke="#1f6f4a" stroke-width="4"/>
  <circle cx="925" cy="290" r="132" fill="none" stroke="#1f6f4a" stroke-opacity=".28" stroke-width="2" stroke-dasharray="8 12"/>
  <circle cx="925" cy="290" r="90" fill="#ffffff" stroke="#1f6f4a" stroke-width="4"/>
  <circle cx="925" cy="290" r="54" fill="#f7c744" stroke="#1f6f4a" stroke-width="4"/>
  <text x="925" y="314" text-anchor="middle" font-family="Arial, sans-serif" font-size="70" font-weight="900" fill="#142018">W</text>
  <path d="M795 290H864M986 290H1055M925 158V229M925 351V422M833 198l50 50M1017 198l-50 50M833 382l50-50M1017 382l-50-50" stroke="#1f6f4a" stroke-width="5"/>
  <text x="86" y="150" font-family="Arial, sans-serif" font-size="88" font-weight="900" fill="#142018">Wooolfmesh</text>
  <text x="90" y="240" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#142018">Private local operating</text>
  <text x="90" y="302" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#142018">system for daily execution.</text>
  <text x="90" y="382" font-family="Arial, sans-serif" font-size="29" font-weight="600" fill="#55665c">Tasks, focus, memory, reviews and</text>
  <text x="90" y="422" font-family="Arial, sans-serif" font-size="29" font-weight="600" fill="#55665c">personal knowledge around Markdown.</text>
  <rect x="90" y="508" width="326" height="60" rx="8" fill="#1f6f4a"/>
  <text x="253" y="548" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="900" fill="#ffffff">wooolfmesh.github.io</text>
  <defs><pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0v34" fill="none" stroke="#050505" stroke-opacity=".055"/></pattern></defs>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("assets/og.png");
