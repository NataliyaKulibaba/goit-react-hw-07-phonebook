import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';

const useLocalStorage = (key, defaultValue) => {
  // const state = useSelector(state=>state.items)
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
