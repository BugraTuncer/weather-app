import React from "react";
import "../styles/ErrorDisplay.css";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Error",
  message,
  onRetry,
  retryButtonText = "Try Again",
}) => {
  return (
    <div className="error-container">
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="refresh-button">
          {retryButtonText}
        </button>
      )}
    </div>
  );
};
