import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const MIN = 0;
  const MAX = 5;

  const handleIncrement = () => {
    if (count < MAX) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > MIN) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <main>
      <h1>카운터</h1>
      <p>현재 값: {count}</p>
      
      <button 
        onClick={handleIncrement}
        disabled={count >= MAX}
      >
        +1
      </button>
      
      <button 
        onClick={handleDecrement}
        disabled={count <= MIN}
      >
        -1
      </button>
      
      <button onClick={handleReset}>
        초기화
      </button>
    </main>
  );
}