import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState({});
  const apiUrl = 'http://localhost:8000/count_keywords'; // Mettez à jour avec l'URL de votre API

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: { keyword: keyword },
      });

      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>PDF Keyword Counter</h1>
      <label>
        Keyword:
        <input type="text" value={keyword} onChange={handleKeywordChange} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {Object.keys(results).map((filename) => (
        <div key={filename}>
          {filename}: {results[filename]}
        </div>
      ))}
    </div>
  );
}

export default App;
