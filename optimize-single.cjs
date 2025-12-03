const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = {
  mobile: 400,
  tablet: 800,
  desktop: 1200
};

const images = [
  'image copy 4.png'
];

async function optimizeImage(fileName) {
  const inputPath = path.join(__dirname, 'src/assets', fileName);
  const outputDir = path.join(__dirname, 'src/assets/optimized');
  const nameWithoutExt = path.basename(fileName, path.extname(fileName));
  
  console.log(`Optimizing: ${fileName}`);
  
  for (const [size, width] of Object.entries(sizes)) {
    const outputPath = path.join(outputDir, `${nameWithoutExt}-${size}.webp`);
    await sharp(inputPath)
      .resize(width, width, { fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Created: ${nameWithoutExt}-${size}.webp`);
  }
  
  const metadata = await sharp(inputPath).metadata();
  const squareSize = Math.min(metadata.width, metadata.height);
  
  await sharp(inputPath)
    .resize(squareSize, squareSize, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, `${nameWithoutExt}-original.webp`));
}

async function optimize() {
  for (const img of images) {
    await optimizeImage(img);
  }
  console.log('Done!');
}

optimize();
