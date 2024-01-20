import { FC, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Nav } from '../../components';
import { useNavigate } from 'react-router-dom';
import { localStorageUtils, tokenUtils } from '../../utils';
import axios from 'axios';

interface SignupType {
  name: string;
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

const Signup: FC = () => {
  const { control, handleSubmit } = useForm<SignupType>()
  const navigate = useNavigate();

  const onSubmit = async (data: SignupType) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', data);
      const incomingData: IncomingData = response?.data;

      localStorageUtils.setItem('token', incomingData?.token);
      localStorageUtils.setItem('user', JSON.stringify(incomingData?.user));

      navigate('/login');

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorageUtils.getItem('token');

    if (typeof token !== 'string') return;

    const checkToken = async (token: string) => {
      try {
        const isValid = await tokenUtils.checkIfTokenIsValid(token);
        if (isValid) return navigate('/admin')
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
      <div className='grid h-[80dvh] place-items-center'>

        <div className="max-w-7xl mx-auto flex justify-center p-12">
          <div className="p-12 shadow-2xl rounded-xl">
            <div className='mb-6 text-xl font-semibold text-red-400'>Signup</div>
            <form className='flex flex-col space-y-5' onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className='text-left'>Name</div>
                <Controller
                  name='name'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <input {...field} className='border-2 border-indigo-300 block h-10 w-{300px} rounded-sm' />}
                />
              </div>
              <div className="">
                <div className="text-left">Email</div>
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <input {...field} className='border-2 border-indigo-300 block h-10 w-{300px} rounded-sm' />}
                />
              </div>
              <div className="">
                <div className="text-left">Password</div>
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  render={({ field }) => <input {...field} className='border-2 border-indigo-300 block h-10 w-{300px} rounded-sm' />}
                />
              </div>
              <input type="submit" value="submit" className='px-4 py-2 bg-indigo-400 rounded-lg text-black font-normal' />
            </form>
          </div>
        </div >
      </div >
    </>
  )
}

export { Signup }