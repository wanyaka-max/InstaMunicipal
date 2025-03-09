import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 40, className = "" }: LogoProps) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="20"
          fill="url(#gradient)"
        />
        <path
          d="M30 35 H70 M30 50 H70 M30 65 H70"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      </svg>
    </div>
  );
};

export default Logo;
