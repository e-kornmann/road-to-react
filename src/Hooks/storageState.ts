import { useRef, useState, useEffect } from 'react';

const useStorageState = (
  key: string,
  initialState: string,
): [string, (newValue: string) => void] => {
  const isMounted = useRef(false);

  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log('A');
      localStorage.setItem(key, value);
    }
  }, [value, key]);
  return [value, setValue];
};

export default useStorageState;
