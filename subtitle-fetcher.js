import OpenSubtitles from 'opensubtitles-api';
import JSZip from 'jszip';
import fs from 'fs';
import fetch from 'node-fetch';

const os = new OpenSubtitles({
  useragent: 'SubtitleFetcher v1.0',
  ssl: true
});

async function fetchSubtitles(query, language = 'eng') {
  try {
    console.log(`Searching for: ${query}`);
    
    const results = await os.search({
      sublanguageid: language,
      limit: 5,
      query: query
    });

    console.log('Results:', results);

    if (!results || Object.keys(results).length === 0) {
      console.log('No subtitles found');
      return;
    }

    const firstKey = Object.keys(results)[0];
    const subtitleArray = results[firstKey];
    
    if (!subtitleArray || subtitleArray.length === 0) {
      console.log('No subtitles in results');
      return;
    }
    
    const firstResult = subtitleArray[0];
    
    console.log(`Found subtitle: ${firstResult.filename}`);
    console.log(`Download URL: ${firstResult.url}`);
    
    if (!firstResult.url) {
      console.log('No download URL available');
      return;
    }
    
    // Try UTF-8 version first (direct SRT download)
    const downloadUrl = firstResult.utf8 || firstResult.url;
    
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const content = await response.text();
    const filename = firstResult.filename;
    
    fs.writeFileSync(filename, content);
    console.log(`Downloaded: ${filename}`);
    console.log(`File size: ${content.length} characters`);
    console.log(`First few lines:`);
    console.log(content.substring(0, 200) + '...');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const query = process.argv[2];
const language = process.argv[3] || 'eng';

if (!query) {
  console.log('Usage: node subtitle-fetcher.js "movie name" [language]');
  console.log('Example: node subtitle-fetcher.js "The Matrix" eng');
  process.exit(1);
}

fetchSubtitles(query, language);