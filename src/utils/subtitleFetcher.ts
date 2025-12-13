import OpenSubtitles from 'opensubtitles-api';
import JSZip from 'jszip';

interface SubtitleSearchParams {
  query: string;
  language?: string;
  limit?: number;
}

interface SubtitleFile {
  filename: string;
  content: string;
}

class SubtitleFetcher {
  private os: any;

  constructor() {
    this.os = new OpenSubtitles({
      useragent: 'SubtitleFetcher v1.0',
      ssl: true
    });
  }

  async search(params: SubtitleSearchParams): Promise<any[]> {
    try {
      const searchParams = {
        sublanguageid: params.language || 'eng',
        limit: params.limit || 10,
        query: params.query
      };

      const results = await this.os.search(searchParams);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }

  async downloadAndExtract(downloadUrl: string): Promise<SubtitleFile[]> {
    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(arrayBuffer);

      const subtitleFiles: SubtitleFile[] = [];

      for (const [filename, file] of Object.entries(zipContent.files)) {
        if (!file.dir && (filename.endsWith('.srt') || filename.endsWith('.vtt'))) {
          const content = await file.async('text');
          subtitleFiles.push({ filename, content });
        }
      }

      return subtitleFiles;
    } catch (error) {
      console.error('Download/extract failed:', error);
      throw error;
    }
  }

  async fetchSubtitles(params: SubtitleSearchParams): Promise<{ results: any[], subtitles: SubtitleFile[] }> {
    const results = await this.search(params);
    
    if (results.length === 0) {
      return { results: [], subtitles: [] };
    }

    // Download first result
    const firstResult = results[0];
    if (firstResult.url) {
      try {
        const subtitles = await this.downloadAndExtract(firstResult.url);
        return { results, subtitles };
      } catch (error) {
        console.error('Failed to download subtitles:', error);
        return { results, subtitles: [] };
      }
    }

    return { results, subtitles: [] };
  }
}

export default SubtitleFetcher;
export type { SubtitleSearchParams, SubtitleFile };