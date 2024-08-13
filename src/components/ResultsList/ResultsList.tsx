import { useRef } from 'react';
import styles from './ResultsList.module.css';

interface ResultItem {
  url: string;
  title: string;
  description: string;
}

interface ResultsListProps {
  results: ResultItem[];
}

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.resultsListContainer}>
      <div ref={resultsRef} className={styles.resultsList}>
        <p>{results.length} results found</p>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <a href={result.url} target='_blank' rel='noopener noreferrer'>
                {result.title}
              </a>
              <a href={result.url} className={styles.url}>
                {result.url}
              </a>
              <p className={styles.description}>{result.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultsList;
