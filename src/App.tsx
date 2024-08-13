import { useState, useRef } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultsList/ResultsList';
import { mockData } from '../data';
import { DataItem } from './types';
import Pagination from './components/Pagination/Pagination';
import './app.css';

const RESULTSPERPAGE = 5;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState<
    { title: string }[]
  >([]);
  const [searchHistory, setSearchHistory] = useState<
    { title: string; isHistory: boolean }[]
  >([]);
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(searchResults.length / RESULTSPERPAGE);

  const cacheRef = useRef<Map<string, DataItem[]>>(new Map());

  const handleInputChange = (query: string) => {
    setSearchQuery(query);

    if (query) {
      const suggestions = mockData
        .filter((item) =>
          item.title.toLowerCase().startsWith(query.toLowerCase())
        )
        .map((item) => ({ title: item.title }));
      setAutoCompleteSuggestions(suggestions.slice(0, 10));
    } else {
      setAutoCompleteSuggestions([]);
    }
  };

  const handleSearch = (query: string) => {
    if (!query) return;

    if (cacheRef.current.has(query)) {
      setSearchResults(cacheRef.current.get(query)!);
      setResultsVisible(true);
    } else {
      const results = mockData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      cacheRef.current.set(query, results);

      setSearchResults(results);
      setResultsVisible(true);
    }

    if (!searchHistory.find((item) => item.title === query)) {
      setSearchHistory([...searchHistory, { title: query, isHistory: true }]);
    }

    setCurrentPage(1);
  };

  const handleRemoveHistoryItem = (title: string) => {
    setSearchHistory(searchHistory.filter((item) => item.title !== title));
  };

  const paginateResults = () => {
    const startIndex = (currentPage - 1) * RESULTSPERPAGE;
    return searchResults.slice(startIndex, startIndex + RESULTSPERPAGE);
  };

  return (
    <div className='app'>
      <SearchBar
        query={searchQuery}
        onChange={handleInputChange}
        onSearch={handleSearch}
        suggestions={autoCompleteSuggestions}
        history={searchHistory}
        onRemoveHistoryItem={handleRemoveHistoryItem}
      />
      {resultsVisible && (
        <>
          <ResultsList results={paginateResults()} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
