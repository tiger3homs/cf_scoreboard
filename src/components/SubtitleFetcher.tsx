import React, { useState } from 'react';
import SubtitleFetcher, { SubtitleFile } from '../utils/subtitleFetcher';

const SubtitleFetcherComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('eng');
  const [loading, setLoading] = useState(false);
  const [subtitles, setSubtitles] = useState<SubtitleFile[]>([]);
  const [error, setError] = useState('');

  const fetcher = new SubtitleFetcher();

  const handleFetch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setSubtitles([]);

    try {
      const { subtitles: fetchedSubtitles } = await fetcher.fetchSubtitles({
        query: query.trim(),
        language,
        limit: 5
      });
      
      setSubtitles(fetchedSubtitles);
      if (fetchedSubtitles.length === 0) {
        setError('No subtitles found');
      }
    } catch (err) {
      setError('Failed to fetch subtitles');
    } finally {
      setLoading(false);
    }
  };

  const downloadSubtitle = (subtitle: SubtitleFile) => {
    const blob = new Blob([subtitle.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = subtitle.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Subtitle Fetcher</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search for movie/TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '300px', padding: '8px', marginRight: '10px' }}
        />
        
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="eng">English</option>
          <option value="spa">Spanish</option>
          <option value="fre">French</option>
          <option value="ger">German</option>
        </select>
        
        <button
          onClick={handleFetch}
          disabled={loading || !query.trim()}
          style={{ padding: '8px 16px' }}
        >
          {loading ? 'Fetching...' : 'Fetch Subtitles'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      {subtitles.length > 0 && (
        <div>
          <h3>Downloaded Subtitles:</h3>
          {subtitles.map((subtitle, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <div style={{ fontWeight: 'bold' }}>{subtitle.filename}</div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                {subtitle.content.length} characters
              </div>
              <button
                onClick={() => downloadSubtitle(subtitle)}
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubtitleFetcherComponent;