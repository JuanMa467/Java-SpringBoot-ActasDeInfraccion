import { useState, useCallback } from 'react';

export function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type = 'success') => {
    setAlert({ message, type });
  }, []);

  const dismissAlert = useCallback(() => setAlert(null), []);

  return { alert, showAlert, dismissAlert };
}
