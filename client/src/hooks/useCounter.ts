import { useState } from "react";

interface CounterHook {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = (initialCount: number = 0): CounterHook => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

export { useCounter };