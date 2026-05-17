import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M0 0h1200v630H0z" fill="url(#grid)"/>
  <rect x="735" y="105" width="360" height="360" rx="18" fill="#050505" stroke="#050505" stroke-width="4"/>
  <circle cx="915" cy="285" r="150" fill="none" stroke="#ffffff" stroke-opacity=".24" stroke-width="2" stroke-dasharray="8 12"/>
  <circle cx="915" cy="285" r="96" fill="#fff7d6" stroke="#050505" stroke-width="4"/>
  <circle cx="915" cy="285" r="58" fill="#ffd23f" stroke="#050505" stroke-width="4"/>
  <text x="915" y="311" text-anchor="middle" font-family="Arial, sans-serif" font-size="74" font-weight="900" fill="#050505">W</text>
  <path d="M765 285H857M973 285H1065M915 135V227M915 343V435M810 180l65 65M1020 180l-65 65M810 390l65-65M1020 390l-65-65" stroke="#ffd23f" stroke-width="5"/>
  <text x="86" y="156" font-family="Arial, sans-serif" font-size="92" font-weight="900" fill="#050505">Wooolfmesh</text>
  <text x="90" y="252" font-family="Arial, sans-serif" font-size="54" font-weight="900" fill="#050505">Local-first memory</text>
  <text x="90" y="318" font-family="Arial, sans-serif" font-size="54" font-weight="900" fill="#050505">for agentic work.</text>
  <text x="90" y="398" font-family="Arial, sans-serif" font-size="29" font-weight="600" fill="#46413d">Turn tasks, notes, decisions and lessons</text>
  <text x="90" y="438" font-family="Arial, sans-serif" font-size="29" font-weight="600" fill="#46413d">into reusable execution memory.</text>
  <rect x="90" y="508" width="326" height="60" rx="8" fill="#ffd23f" stroke="#050505" stroke-width="4"/>
  <text x="253" y="548" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="900" fill="#050505">wooolfmesh.github.io</text>
  <defs><pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0v34" fill="none" stroke="#050505" stroke-opacity=".055"/></pattern></defs>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("assets/og.png");
