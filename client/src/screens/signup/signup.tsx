import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'

interface AluType {
  name: string;
  email: string;
  password: string;
}

const Signup: FC = () => {
  const { control, handleSubmit } = useForm<AluType>()

  const onSubmit = (data: AluType) => {
    console.log(data)
  }

  return (
    <>
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
    </>
  )
}

export { Signup }