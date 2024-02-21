import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(findInitialValue(key, initialValue));

  function findInitialValue(key, initialValue) {
    let storedInitialValue = localStorage.getItem(key);
    if (storedInitialValue) return JSON.parse(storedInitialValue);
    return initialValue;
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
