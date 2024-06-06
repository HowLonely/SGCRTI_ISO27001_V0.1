import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: method,
          headers: {
            'Content-Type': 'application/json', // Puedes ajustar los encabezados según tus necesidades
          },
          body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Something went wrong');
        }

        setData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [url, method, body]);

  return { data, isLoading, error };
};
