import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// EDIT THESE MOVIE DETAILS
const MOVIE_INFO = {
  name: "Calvary",
  year: 2014,
  language: "en", // en, es, fr, de, etc.
  quality: "WEB", // WEB, BluRay, HDTV, etc.
  resolution: "1080p" // 720p, 1080p, 4K, etc. (optional)
};

function createVideoFile(movieName, year, quality, resolution, folder) {
  const filename = resolution 
    ? `${movieName.replace(/\s+/g, '.')}.${year}.${resolution}.${quality}.mp4`
    : `${movieName.replace(/\s+/g, '.')}.${year}.${quality}.mp4`;
  
  const fullPath = path.join(folder, filename);
  // Create dummy video file
  fs.writeFileSync(fullPath, '');
  return fullPath;
}

function runSubliminal(filename, language, folder) {
  return new Promise((resolve, reject) => {
    const cmd = `cd "${folder}" && subliminal download -l ${language} --provider opensubtitles --provider podnapisi "${path.basename(filename)}"`;
    
    console.log(`Running: ${cmd}`);
    
    const process = exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        console.log('Subliminal failed, trying alternative format...');
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
    
    // Kill if stuck
    setTimeout(() => {
      process.kill();
      reject(new Error('Timeout'));
    }, 30000);
  });
}

async function downloadSubtitle() {
  const { name, year, language, quality, resolution } = MOVIE_INFO;
  
  console.log(`Downloading subtitles for: ${name} (${year})`);
  
  // Create movie-specific folder
  const movieFolder = `${name.replace(/\s+/g, '_')}_${year}`;
  const folder = path.join('subtitles', movieFolder);
  if (!fs.existsSync('subtitles')) {
    fs.mkdirSync('subtitles');
  }
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  
  // Try different filename formats
  const formats = [
    createVideoFile(name, year, quality, resolution, folder),
    createVideoFile(name, year, `${resolution}.WEB-DL.x264`, null, folder),
    createVideoFile(name, year, "HDTV.x264-LOL", null, folder)
  ];
  
  for (const filename of formats) {
    try {
      console.log(`\nTrying format: ${filename}`);
      await runSubliminal(filename, language, folder);
      
      // Check if subtitle was downloaded
      const srtFile = filename.replace('.mp4', '.srt');
      if (fs.existsSync(srtFile)) {
        console.log(`✓ Success! Downloaded: ${srtFile}`);
        // Clean up video file
        fs.unlinkSync(filename);
        return;
      }
    } catch (error) {
      console.log(`Failed with ${filename}`);
      // Clean up video file
      if (fs.existsSync(filename)) fs.unlinkSync(filename);
    }
  }
  
  console.log('\n❌ All methods failed. Try manual download:');
  console.log(`1. Go to https://www.opensubtitles.org/`);
  console.log(`2. Search for: ${name} ${year}`);
  console.log(`3. Download the ${language} subtitle`);
}

downloadSubtitle().catch(console.error);