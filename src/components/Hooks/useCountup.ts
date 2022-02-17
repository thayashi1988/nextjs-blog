import { useState, useCallback } from 'react';

export const useCountup = () => {
  const [count, setCount] = useState(0);

  const handleCountUp = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const handleCountReset = useCallback(() => {
    setCount(0);
  }, []);

  return { count, handleCountUp, handleCountReset };
};
