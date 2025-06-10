import React, { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  status: 'success' | 'error' | 'warn';
  duration?: number;
};

const Toast: React.FC<ToastProps> = ({ message, status, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
        className={`
            fixed 
            top-[50px] 
            left-1/2 
            -translate-x-1/2 
            text-white 
            px-6 py-3 
            rounded-lg 
            shadow-md 
            z-[9999] 
            min-w-[200px] 
            text-center 
            font-medium 
            select-none
            ${status === 'success' ? 'bg-green-500' : ''}
            ${status === 'error' ? 'bg-red-500' : ''}
            ${status === 'warn' ? 'bg-orange-500' : ''}
        `}
        role="alert"
        >
        {message}
        </div>

  );
};

export default Toast;
