import { FC, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Nav } from '../../components';
import { localStorageUtils } from '../../utils';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

interface LoginType {
  email: string;
  password: string;
}

interface IncomingData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

const Login: FC = () => {

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginType>();

  const onSubmit = async (data: LoginType) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', data);
      const incomingData: IncomingData = response?.data;

      localStorageUtils.setItem('token', incomingData?.token);
      localStorageUtils.setItem('user', JSON.stringify(incomingData?.user));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (typeof token !== 'string') return;
    
    return navigate('/admin')
  })

  return (
    <>
      <Nav />
      <div className='grid h-[80dvh] place-items-center'>

        <div className="max-w-7xl mx-auto flex justify-center p-12">
          <div className="p-12 shadow-2xl rounded-xl">
            <div className='mb-6 text-xl font-semibold text-red-400'>Login</div>
            <form className='flex flex-col space-y-5' onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="text-left">Email</div>
                <Controller
                  name='email'
                  control={control}
                  defaultValue={''}
                  render={({ field }) => <input {...field} className='border-2 border-indigo-300  block h-10 w-{300px} rounded-sm px-1' />}
                />
              </div>
              <div className="">
                <div className="text-left">Password</div>
                <Controller
                  name='password'
                  control={control}
                  defaultValue={''}
                  render={({ field }) => <input {...field} className='border-2 border-indigo-300  block h-10 w-{300px} rounded-sm px-1' />}
                />
              </div>
              <input type="submit" value="Login" className='px-4 py-2 bg-indigo-400 rounded-lg text-black font-normal' />
            </form>
          </div>
        </div >
      </div>
    </>
  )
}

export { Login }