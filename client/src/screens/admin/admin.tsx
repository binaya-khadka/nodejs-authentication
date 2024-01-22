import { FC, useEffect } from 'react'
import { localStorageUtils, tokenUtils } from '../../utils'
import { useNavigate } from 'react-router-dom'

import { Nav } from '../../components'

const Admin: FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorageUtils.clear();
    navigate('/login')
  }

  useEffect(() => {
    const token = localStorageUtils.getItem('token');
   
    if (typeof token !== 'string') return navigate('/login');
   
    const checkToken = async (token: string) => {
       try {
         const isValid = await tokenUtils.checkIfTokenIsValid(token);
         if (!isValid) return navigate('/login');
       } catch (error) {
         console.log(error)
         return 
       }
    }
    checkToken(token);
   }, [navigate])

  return (
    <>
      <Nav />
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mt-7'>
          <h1 className=' text-2xl text-red-400 text-center font-bold'>Admin Page</h1>
          <button onClick={handleLogout} className='px-4 py-2 border-none outline-none bg-indigo-200 mt-2 rounded-lg'>Log Out</button>
        </div>
      </div>
    </>
  )
}

export { Admin }