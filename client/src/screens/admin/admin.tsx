import { FC, useEffect } from 'react'
import { localStorageUtils, tokenUtils } from '../../utils'
import { useNavigate } from 'react-router-dom'

import { Nav } from '../../components'

const Admin: FC = () => {

  const navigate = useNavigate();

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
        </div>
      </div>
    </>
  )
}

export { Admin }