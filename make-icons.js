const fs = require('fs');
const zlib = require('zlib');

function generateIcon(size) {
  const width = size;
  const height = size;
  const rowLen = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowLen);
  const cx = width / 2;
  const cy = height / 2;
  const rOuter = width * 0.46;
  const rGold = width * 0.42;
  const rWhite = width * 0.38;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const d = Math.hypot(x - cx, y - cy);

      if (d > rOuter) {
        // Dark slate (#0F172A)
        rawData[pxOffset] = 15;
        rawData[pxOffset + 1] = 23;
        rawData[pxOffset + 2] = 42;
      } else if (d > rGold) {
        // Gold trim (#D4AF37)
        rawData[pxOffset] = 212;
        rawData[pxOffset + 1] = 175;
        rawData[pxOffset + 2] = 55;
      } else if (d > rWhite) {
        // White border (#FFFFFF)
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 255;
        rawData[pxOffset + 2] = 255;
      } else {
        // SAFC Red (#C8102E)
        rawData[pxOffset] = 200;
        rawData[pxOffset + 1] = 16;
        rawData[pxOffset + 2] = 46;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 2;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([t, data]));
    const c = Buffer.alloc(4);
    c.writeUInt32BE(crc, 0);
    return Buffer.concat([len, t, data, c]);
  }

  return Buffer.concat([sig, chunk('IHDR', ihdrData), chunk('IDAT', deflated), chunk('IEND', Buffer.alloc(0))]);
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ crcTable[(c ^ buf[i]) & 0xFF];
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

fs.writeFileSync('icon-192.png', generateIcon(192));
fs.writeFileSync('icon-512.png', generateIcon(512));
console.log('Created icon-192.png and icon-512.png successfully!');