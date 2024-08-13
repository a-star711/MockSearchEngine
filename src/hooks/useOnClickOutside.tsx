import { useEffect, RefObject } from 'react';

interface UseOnClickOutsideProps {
  ref: RefObject<HTMLElement>;
  handler: () => void;
}

const useOnClickOutside = ({ ref, handler }: UseOnClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
