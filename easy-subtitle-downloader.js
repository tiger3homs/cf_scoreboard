import fetch from 'node-fetch';
import JSZip from 'jszip';
import fs from 'fs';

// EDIT THESE MOVIE DETAILS
const MOVIE_INFO = {
  name: "A Creature Was Stirring",
  year: 2023,
  language: "en", // en, es, fr, de, etc.
  // Optional: direct download URL if you have one
  downloadUrl: null
};

async function downloadSubtitle() {
  const movieName = MOVIE_INFO.name;
  const year = MOVIE_INFO.year;
  const lang = MOVIE_INFO.language;
  
  console.log(`Downloading subtitles for: ${movieName} (${year})`);
  
  // If direct URL provided, use it
  if (MOVIE_INFO.downloadUrl) {
    try {
      console.log('Using direct download URL...');
      const response = await fetch(MOVIE_INFO.downloadUrl);
      
      if (response.headers.get('content-type')?.includes('zip')) {
        // Handle ZIP file
        const buffer = await response.arrayBuffer();
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(buffer);
        
        for (const [filename, file] of Object.entries(zipContent.files)) {
          if (!file.dir && filename.endsWith('.srt')) {
            const content = await file.async('text');
            fs.writeFileSync(filename, content);
            console.log(`✓ Downloaded: ${filename}`);
          }
        }
      } else {
        // Handle direct SRT file
        const content = await response.text();
        const filename = `${movieName.replace(/\s+/g, '.')}.${year}.srt`;
        fs.writeFileSync(filename, content);
        console.log(`✓ Downloaded: ${filename}`);
      }
      return;
    } catch (error) {
      console.log('Direct download failed, trying search...');
    }
  }
  
  // Search method (you can add more sources here)
  console.log('Searching subtitle databases...');
  console.log(`Movie: ${movieName}`);
  console.log(`Year: ${year}`);
  console.log(`Language: ${lang}`);
  console.log('\nTo download manually:');
  console.log(`1. Go to https://www.opensubtitles.org/`);
  console.log(`2. Search for: ${movieName} ${year}`);
  console.log(`3. Download the ${lang} subtitle`);
  console.log(`4. Or find direct download URL and update MOVIE_INFO.downloadUrl`);
}

downloadSubtitle().catch(console.error);