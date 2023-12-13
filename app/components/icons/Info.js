const Info = ({ className }) => {
  return (
    <svg
      className={
        className ? className : 'w-6 h-6 text-gray-800 dark:text-white'
      }
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 20 20'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
      />
    </svg>
  );
};

export default Info;
