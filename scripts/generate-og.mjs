import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8f8f4"/>
  <path d="M0 0h1200v630H0z" fill="url(#grid)"/>
  <circle cx="980" cy="130" r="260" fill="#f2c94c" opacity=".24"/>
  <circle cx="1010" cy="500" r="270" fill="#d58d95" opacity=".18"/>
  <rect x="746" y="108" width="366" height="366" rx="8" fill="#d9d5ca" stroke="#181816" stroke-opacity=".16" stroke-width="3"/>
  <text x="86" y="146" font-family="Arial, sans-serif" font-size="90" font-weight="900" fill="#181816">Wooolfmesh</text>
  <text x="90" y="238" font-family="Arial, sans-serif" font-size="46" font-weight="900" fill="#181816">Local-first memory</text>
  <text x="90" y="298" font-family="Arial, sans-serif" font-size="46" font-weight="900" fill="#181816">for agentic work.</text>
  <text x="90" y="378" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="#5c5e57">Tasks, capture, focus, reviews, learning,</text>
  <text x="90" y="418" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="#5c5e57">search and optional AI over Markdown.</text>
  <rect x="90" y="506" width="326" height="60" rx="8" fill="#2f654d"/>
  <text x="253" y="546" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="900" fill="#ffffff">wooolfmesh.github.io</text>
  <defs><pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0v42" fill="none" stroke="#181816" stroke-opacity=".052"/></pattern></defs>
</svg>`;

const mascot = await sharp("assets/wooolfmesh.png")
  .resize(366, 366, { fit: "cover" })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: mascot, left: 746, top: 108 }])
  .png()
  .toFile("assets/og.png");
