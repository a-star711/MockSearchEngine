import { useEffect, useMemo, useRef, useState } from 'react';
import AutoComplete from '../AutoComplete/AutoComplete';
import { HistoryItem, Suggestion } from '../../types';
import { DebounceInput } from 'react-debounce-input';
import CleanIcon from '../ui/Icons/CleanIcon';
import SearchIcon from '../ui/Icons/SearchIcon';
import useOnClickOutside from '../../hooks/useOnclickOutside';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  suggestions: Suggestion[];
  history: HistoryItem[];
  onRemoveHistoryItem: (title: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChange,
  onSearch,
  suggestions,
  history,
  onRemoveHistoryItem,
}) => {
  const [isAutocompleteVisible, setAutocompleteVisible] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<
    number | null
  >(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDropdownVisible = useMemo(() => {
    return isAutocompleteVisible && !!suggestions.length;
  }, [isAutocompleteVisible, suggestions.length]);

  useOnClickOutside({
    ref: autocompleteRef,
    handler: () => setAutocompleteVisible(false),
  });

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSuggestionIndex(null);
    setAutocompleteVisible(true);
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (selectedSuggestionIndex !== null && selectedSuggestionIndex >= 0) {
        onSearch(suggestions[selectedSuggestionIndex].title);
      } else {
        onSearch(query);
      }

      setAutocompleteVisible(false);
      setSelectedSuggestionIndex(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === null || prevIndex === suggestions.length - 1
          ? 0
          : prevIndex + 1
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? suggestions.length - 1
          : prevIndex - 1
      );
    }
  };

  const handleSuggestionClick = (title: string) => {
    setAutocompleteVisible(false);
    setSelectedSuggestionIndex(null);
    onChange(title);
    onSearch(title);
  };

  const handleClean = () => {
    onChange('');
  };

  return (
    <div className={styles.searchBarWrapper}>
      <h1 className={styles.title}>SearchX</h1>
      <div className={styles.searchBar}>
        <SearchIcon styles={styles.searchIcon} />
        <DebounceInput
          className={`${styles.searchInput} ${
            isDropdownVisible && styles.searchInputWithValue
          }`}
          inputRef={inputRef}
          type='text'
          value={query}
          debounceTimeout={300}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          placeholder='Search...'
        />
        <CleanIcon handleClean={handleClean} styles={styles.cleanIcon} />
      </div>
      {isDropdownVisible && (
        <AutoComplete
          suggestions={suggestions}
          history={history}
          onSuggestionClick={handleSuggestionClick}
          onRemoveHistoryItem={onRemoveHistoryItem}
          selectedIndex={selectedSuggestionIndex}
          autocompleteRef={autocompleteRef}
        />
      )}
    </div>
  );
};

export default SearchBar;
