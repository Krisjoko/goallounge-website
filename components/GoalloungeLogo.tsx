interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export default function GoalloungeLogo({ className, width = 40, height = 40 }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Goallounge"
    >
      <circle cx="20" cy="20" r="18" stroke="#E0DDD8" strokeWidth="1.5" />
      <path
        d="M20 11C15.029 11 11 15.029 11 20C11 24.971 15.029 29 20 29C22.485 29 24.735 28.005 26.364 26.364L23.536 23.536C22.628 24.444 21.378 25 20 25C17.239 25 15 22.761 15 20C15 17.239 17.239 15 20 15C21.378 15 22.628 15.556 23.536 16.464L20 20H29V11L26.364 13.636C24.735 11.995 22.485 11 20 11Z"
        fill="#E0DDD8"
      />
    </svg>
  );
}
