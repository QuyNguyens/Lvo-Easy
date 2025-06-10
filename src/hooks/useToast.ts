// useToast.ts
import { useState } from 'react';
import { ToastData } from '../types/toast';

export function useToast() {
  const [toast, setToast] = useState<ToastData>({
    message: '',
    status: 'success',
    show: false,
  });

  const showToast = (message: string, status: ToastData['status'] = 'success') => {
    setToast({ message, status, show: true });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return { toast, showToast, hideToast };
}
