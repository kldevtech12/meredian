const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../src/assets');
const optimizedDir = path.join(__dirname, '../src/assets/optimized');

if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

const sizes = {
  mobile: 400,
  tablet: 800,
  desktop: 1200
};

async function optimizeImage(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const nameWithoutExt = path.basename(fileName, ext);
  
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  console.log(`Optimizing: ${fileName}`);
  
  try {
    for (const [size, width] of Object.entries(sizes)) {
      const outputName = `${nameWithoutExt}-${size}.webp`;
      const outputPath = path.join(optimizedDir, outputName);
      
      await sharp(filePath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Created: ${outputName}`);
    }
    
    const originalWebp = `${nameWithoutExt}-original.webp`;
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(path.join(optimizedDir, originalWebp));
      
  } catch (error) {
    console.error(`Error optimizing ${fileName}:`, error);
  }
}

async function processImages() {
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    if (fs.statSync(filePath).isFile()) {
      await optimizeImage(filePath, file);
    }
  }
  
  console.log('Image optimization completed!');
}

processImages();