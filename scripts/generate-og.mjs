import { mkdir, writeFile } from "node:fs/promises";

import sharp from "sharp";

const brandAsset = "assets/wooolfmesh.png";
const iconDirectory = "assets/icons";
const background = "#f5f3ec";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${background}"/>
  <path d="M0 72h1200M0 554h1200" fill="none" stroke="#cbc8bd"/>
  <path d="M62 0v630M748 0v630" fill="none" stroke="#e0ddd4"/>
  <text x="62" y="48" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#171715">WOOOLFMESH</text>
  <text x="62" y="193" font-family="Arial, sans-serif" font-size="70" font-weight="500" letter-spacing="-4" fill="#171715">Local-first memory</text>
  <text x="62" y="267" font-family="Arial, sans-serif" font-size="70" font-weight="500" letter-spacing="-4" fill="#171715">for agentic work</text>
  <text x="66" y="330" font-family="Arial, sans-serif" font-size="22" fill="#686862">Private execution over user-owned Markdown.</text>
  <text x="66" y="508" font-family="monospace" font-size="15" fill="#686862">MARKDOWN-OWNED  ·  LOCAL RUNTIME  ·  OPTIONAL AI  ·  PREVIEW-FIRST</text>
  <rect x="814" y="124" width="276" height="276" rx="24" fill="#e8e4da" stroke="#cbc8bd"/>
  <path d="M780 464h344" fill="none" stroke="#cbc8bd"/>
  <text x="952" y="498" text-anchor="middle" font-family="monospace" font-size="14" fill="#171715">PRIVATE COMMAND CENTER</text>
</svg>`;

function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(images.length * 16);
  let offset = header.length + directory.length;
  images.forEach(({ size, buffer }, index) => {
    const entry = index * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, entry);
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    directory.writeUInt8(0, entry + 2);
    directory.writeUInt8(0, entry + 3);
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(buffer.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += buffer.length;
  });

  return Buffer.concat([
    header,
    directory,
    ...images.map(({ buffer }) => buffer),
  ]);
}

async function squareIcon(size) {
  return sharp(brandAsset)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function maskableIcon(size) {
  const mascot = await sharp(brandAsset)
    .resize(Math.round(size * 0.66), Math.round(size * 0.66), {
      fit: "cover",
    })
    .png()
    .toBuffer();
  const inset = Math.round(size * 0.17);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: mascot, left: inset, top: inset }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await mkdir(iconDirectory, { recursive: true });

const mascot = await sharp(brandAsset)
  .resize(236, 236, { fit: "cover" })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: mascot, left: 834, top: 144 }])
  .png({ compressionLevel: 9 })
  .toFile("assets/og.png");

const iconSizes = [16, 32, 48, 180, 192, 512];
const icons = new Map(
  await Promise.all(
    iconSizes.map(async (size) => [size, await squareIcon(size)]),
  ),
);

await Promise.all([
  writeFile(`${iconDirectory}/favicon-16x16.png`, icons.get(16)),
  writeFile(`${iconDirectory}/favicon-32x32.png`, icons.get(32)),
  writeFile(`${iconDirectory}/apple-touch-icon.png`, icons.get(180)),
  writeFile(`${iconDirectory}/icon-192.png`, icons.get(192)),
  writeFile(`${iconDirectory}/icon-512.png`, icons.get(512)),
  writeFile(`${iconDirectory}/maskable-192.png`, await maskableIcon(192)),
  writeFile(`${iconDirectory}/maskable-512.png`, await maskableIcon(512)),
  writeFile(
    "favicon.ico",
    buildIco([16, 32, 48].map((size) => ({ size, buffer: icons.get(size) }))),
  ),
]);
