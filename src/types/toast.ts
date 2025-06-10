export interface ToastData {
  message: string;
  status: 'success' | 'error' | 'warn';
  show: boolean;
}