interface StatusMessageProps {
  message: string;
  className?: string;
}

export const StatusMessage = ({ message, className }: StatusMessageProps) => (
  <div className={`px-4 py-3 rounded border ${className}`}>
    {message}
  </div>
);
