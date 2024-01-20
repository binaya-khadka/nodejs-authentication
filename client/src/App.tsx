import React from 'react'
import './App.css'
import { useCounter } from './hooks'
import { Nav } from './components';
import { pageContainer } from './preset-styles';

const App: React.FC = () => {

  const { count, increment, decrement } = useCounter();

  return (
    <>
      <div>
        <Nav />
        <div style={{ ...pageContainer, textAlign: 'center' }}>
          <div className='grid h-[80dvh] place-items-center'>
            <div>
              <p className=''>Count: {count}</p>
              <div className='flex justify-center space-x-4 mt-4'>
                <button className='px-4 py-2 bg-indigo-400 rounded-full hover:bg-slate-400' onClick={increment}>Increment</button>
                <button className='px-4 py-2 bg-indigo-500 rounded-full hover:bg-slate-500' onClick={decrement}>Decrement</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;

