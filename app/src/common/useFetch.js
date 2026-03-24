import { useState, useEffect } from "react";
import { handleResponse } from "./utils";

const useFetch = (url) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));

  if (url !== currentUrl) {
    setCurrentUrl(url);
    setError(null);
    setLoading(Boolean(url));
  }

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(handleResponse)
      .then(
        (result) => { setData(result); setLoading(false); },
        (err) => {
          if (err.name !== 'AbortError') {
            setError(err);
            setLoading(false);
          }
        }
      );

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
