import React from "react";
import "../styles/EmptyState.css";

interface EmptyStateProps {
  title: string;
  message: string;
  onAction?: () => void;
  actionButtonText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  onAction,
  actionButtonText = "Get Started",
}) => {
  return (
    <div className="no-data-container">
      <h2>{title}</h2>
      <p>{message}</p>
      {onAction && (
        <button onClick={onAction} className="refresh-button">
          {actionButtonText}
        </button>
      )}
    </div>
  );
};
