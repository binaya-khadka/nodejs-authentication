import { FC, useEffect } from 'react'
import { localStorageUtils, tokenUtils } from '../../utils'
import { useNavigate } from 'react-router-dom'

import { Nav } from '../../components'

const Admin: FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorageUtils.getItem('token');

    if (typeof token !== 'undefined') return;

    if (!token) {
      return navigate('/login')
    }

    const isTokenValid = tokenUtils.checkIfTokenIsValid(token);

    if (!isTokenValid) return navigate('/login');
  })

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