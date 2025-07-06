import React from "react";
import "../styles/LoadingSpinner.css";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};
