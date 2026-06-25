import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f6f7f2"/>
  <path d="M0 0h1200v630H0z" fill="url(#grid)"/>
  <circle cx="190" cy="90" r="260" fill="#d8ff5a" opacity=".36"/>
  <circle cx="1030" cy="160" r="280" fill="#10a5a5" opacity=".16"/>
  <circle cx="900" cy="500" r="220" fill="#f5a94e" opacity=".16"/>
  <rect x="742" y="104" width="372" height="372" rx="10" fill="#f7f4ec" stroke="#161b18" stroke-opacity=".18" stroke-width="3"/>
  <rect x="70" y="70" width="520" height="64" rx="32" fill="#ffffff" fill-opacity=".72" stroke="#161b18" stroke-opacity=".12"/>
  <text x="102" y="113" font-family="Arial, sans-serif" font-size="30" font-weight="900" fill="#161b18">Wooolfmesh</text>
  <text x="78" y="238" font-family="Arial, sans-serif" font-size="70" font-weight="900" fill="#161b18">Local-first memory</text>
  <text x="78" y="318" font-family="Arial, sans-serif" font-size="70" font-weight="900" fill="#161b18">for agentic work.</text>
  <text x="82" y="392" font-family="Arial, sans-serif" font-size="29" font-weight="600" fill="#515b55">Tasks, capture, focus, reviews, lessons,</text>
  <text x="82" y="434" font-family="Arial, sans-serif" font-size="29" font-weight="600" fill="#515b55">project health and local search over Markdown.</text>
  <rect x="82" y="520" width="318" height="58" rx="8" fill="#161b18"/>
  <text x="241" y="558" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="900" fill="#ffffff">wooolfmesh.github.io</text>
  <defs>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0v42" fill="none" stroke="#126c67" stroke-opacity=".08"/></pattern>
  </defs>
</svg>`;

const mascot = await sharp("assets/wooolfmesh.png")
  .resize(372, 372, { fit: "contain", background: "#d8d4c9" })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: mascot, left: 742, top: 104 }])
  .png()
  .toFile("assets/og.png");
