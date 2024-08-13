import { HistoryItem, Suggestion } from '../../types';
import styles from './AutoComplete.module.css';

interface AutoCompleteProps {
  suggestions: Suggestion[];
  history: HistoryItem[];
  onSuggestionClick: (title: string) => void;
  onRemoveHistoryItem: (title: string) => void;
  selectedIndex: number | null;
  autocompleteRef: React.RefObject<HTMLDivElement>;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  suggestions,
  history,
  onSuggestionClick,
  onRemoveHistoryItem,
  selectedIndex,
  autocompleteRef,
}) => {
  const isInHistory = (title: string) => {
    return history.some((item) => item.title === title);
  };

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={`${
              isInHistory(suggestion.title) ? styles.historyItem : ''
            } ${selectedIndex === index ? styles.selectedItem : ''}`}
            onClick={() => onSuggestionClick(suggestion.title)}
          >
            <span>{suggestion.title}</span>
            {isInHistory(suggestion.title) && (
              <button onClick={() => onRemoveHistoryItem(suggestion.title)}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
