import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f5f3ec"/>
  <path d="M0 72h1200M0 554h1200" fill="none" stroke="#cbc8bd"/>
  <path d="M62 0v630M742 0v630" fill="none" stroke="#e0ddd4"/>
  <text x="112" y="47" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#171715">Wooolfmesh</text>
  <text x="62" y="184" font-family="Arial, sans-serif" font-size="70" font-weight="500" letter-spacing="-4" fill="#171715">Local-first memory</text>
  <text x="62" y="256" font-family="Arial, sans-serif" font-size="70" font-weight="500" letter-spacing="-4" fill="#171715">for agentic work.</text>
  <text x="66" y="316" font-family="Arial, sans-serif" font-size="22" fill="#686862">A private execution layer over local Markdown knowledge.</text>
  <rect x="66" y="382" width="220" height="52" fill="#171715"/>
  <text x="176" y="415" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#f5f3ec">Explore product</text>
  <text x="66" y="508" font-family="monospace" font-size="15" fill="#686862">MARKDOWN-OWNED  ·  LOCAL RUNTIME  ·  OPTIONAL AI  ·  PREVIEW-FIRST</text>
  <rect x="800" y="152" width="154" height="154" fill="none" stroke="#171715" stroke-width="3"/>
  <text x="877" y="222" text-anchor="middle" font-family="monospace" font-size="15" fill="#171715">LOCAL VAULT</text>
  <text x="877" y="249" text-anchor="middle" font-family="monospace" font-size="12" fill="#686862">Markdown</text>
  <path d="M772 229h28M954 229h74M877 306v82" fill="none" stroke="#9f9c93"/>
  <rect x="1027" y="223" width="12" height="12" fill="#d18a0b" stroke="#9b6505"/>
  <rect x="804" y="388" width="146" height="62" fill="none" stroke="#9f9c93" stroke-dasharray="5 5"/>
  <text x="877" y="414" text-anchor="middle" font-family="monospace" font-size="13" fill="#171715">LOCAL RUNTIME</text>
  <text x="877" y="435" text-anchor="middle" font-family="monospace" font-size="11" fill="#686862">SQLite · optional AI</text>
</svg>`;

const mascot = await sharp("assets/wooolfmesh.png")
  .resize(36, 36, { fit: "cover" })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: mascot, left: 62, top: 18 }])
  .png()
  .toFile("assets/og.png");
