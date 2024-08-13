interface CleanIconProps {
  handleClean: () => void;
  styles: string;
}

export default function CleanIcon({ handleClean, styles }: CleanIconProps) {
  return (
    <svg
      onClick={handleClean}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={styles}
    >
      <g id='Menu / Close_LG'>
        <path
          id='Vector'
          d='M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001'
          stroke='#000000'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
}
