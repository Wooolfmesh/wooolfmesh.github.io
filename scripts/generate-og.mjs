import { mkdir, writeFile } from "node:fs/promises";

import sharp from "sharp";

const brandAsset = "assets/wooolfmesh.png";
const iconDirectory = "assets/icons";
const background = "#ffffff";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${background}"/>
  <rect width="78" height="630" fill="#050505"/>
  <rect x="78" y="0" width="1122" height="16" fill="#08b9df"/>
  <rect x="78" y="544" width="782" height="86" fill="#ff006e"/>
  <rect x="860" y="544" width="340" height="86" fill="#ffe11a"/>
  <path d="M78 82h1122M78 544h1122M860 82v548" fill="none" stroke="#050505" stroke-width="5"/>
  <text x="118" y="61" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#050505">WOOOLFMESH</text>
  <text x="116" y="198" font-family="Impact, Arial Black, sans-serif" font-size="88" font-weight="900" letter-spacing="-3" fill="#050505">PICK UP THE WORK.</text>
  <text x="116" y="292" font-family="Impact, Arial Black, sans-serif" font-size="88" font-weight="900" letter-spacing="-3" fill="#ff006e">NOT THE RECAP.</text>
  <text x="120" y="350" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#050505">Local-first memory for work that should be easy to resume.</text>
  <text x="120" y="409" font-family="monospace" font-size="17" fill="#050505">LAST RESULT  /  KEY DECISION  /  NEXT MOVE</text>
  <rect x="116" y="444" width="640" height="56" fill="#08b9df" stroke="#050505" stroke-width="4"/>
  <text x="140" y="480" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#050505">YOUR MARKDOWN · NO SILENT WRITES · OPTIONAL AI</text>
  <text x="116" y="600" font-family="Impact, Arial Black, sans-serif" font-size="32" font-weight="900" fill="#050505">LOCAL / PRIVATE / READY</text>
  <text x="902" y="600" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#050505">PRIVATE BETA</text>
  <rect x="900" y="122" width="236" height="236" fill="#ffe11a" stroke="#050505" stroke-width="5"/>
  <text transform="translate(46 492) rotate(-90)" font-family="Impact, Arial Black, sans-serif" font-size="31" font-weight="900" fill="#ffffff">LOCAL / PRIVATE / READY</text>
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
  .composite([{ input: mascot, left: 900, top: 122 }])
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
