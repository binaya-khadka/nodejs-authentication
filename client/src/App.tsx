import React from 'react'
import './App.css'
import { useCounter } from './hooks'

const App: React.FC = () => {

  const { count, increment, decrement } = useCounter();

  return (
    <>
      <div>
        <p className={'text-red-500 p-2'}>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </>
  )
}

export default App;

