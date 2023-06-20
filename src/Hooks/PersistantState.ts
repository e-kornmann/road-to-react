import {useState, useEffect} from 'react';

export const useSemiPersistantState = (key: string, initialState: string): [string, (newValue: string) => void] => {
    
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );
 
  useEffect(()=> {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};