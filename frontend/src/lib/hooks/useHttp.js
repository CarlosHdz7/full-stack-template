import { useState, useCallback, useRef, useEffect } from 'react';

export function useHttp(httpMethod) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      // Abortar cualquier petición previa pendiente
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setLoading(true);
      setError(null);

      try {
        const result = await httpMethod(...args, { signal: abortController.signal });

        if (result.ok) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error);
          setData(null);
        }

        return result.ok ? result.data : null;
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError('Unexpected Error');
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [httpMethod]
  );

  useEffect(() => {
    return () => {
      // Abort request when component is unmounted
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { loading, error, data, refresh: execute };
}
