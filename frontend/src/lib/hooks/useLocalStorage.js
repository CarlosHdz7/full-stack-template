/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';

function useLocalStorage(key, initialValue = undefined, skipInitialWrite = true) {
  const isFirstRender = useRef(true);

  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  useEffect(() => {
    // Evita escribir en localStorage la primera vez si está activado skipInitialWrite
    if (isFirstRender.current && skipInitialWrite) {
      isFirstRender.current = false;
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”: ', error);
    }
  }, [key, storedValue, skipInitialWrite]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
