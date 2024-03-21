'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { useRouter } from 'next/navigation';



const AddBook = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let x = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let y = await x.json()

    if (y.status == 'ok') {
      router.push('/view')
    }


  };

  return (
    <div className='screen flex flex-col items-center'>
      <h1 className="font-extrabold flex items-center justify-between text-4xl w-full font-aboreto p-[10vh] border-b-2 h-fit">
        <span>Add a Book</span>
        <Link href={'/'} className='text-slate-400 hover:text-white'><lord-icon
          src="https://cdn.lordicon.com/nqtddedc.json"
          trigger="morph"
          state="hover-cross-3"
          colors="primary:#e8308c"
          style={{ width: 50, height: 50 }}>
        </lord-icon></Link>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-4 m-4 bg-white/10 backdrop-blur-sm gap-4 justify-center h-[60%] w-1/2 rounded-xl'>
        <p className='text-white ml-[7%]'>Name:</p>
        <input type="text" placeholder='Please enter name' className='focus:ring-2 w-[90%] text-sm p-3 mx-auto font-verdana text-white bg-slate-800 my-3 rounded-xl' {...register('bookName')} required />
        <p className='text-white ml-[7%]'>Price:</p>
        <input type="text" placeholder='Please enter price' min={0} className='focus:ring-2 w-[90%] text-sm p-3 mx-auto font-verdana text-white bg-slate-800 my-3 rounded-xl' {...register('bookPrice', {
          validate: value => /^-?\d*\.?\d+$/.test(value) ? true : "Please enter a valid number"
        })} required />
        <button type="submit" disabled={isSubmitting} className='disabled:bg-sky-800/20 flex gap-2 justify-center items-center disabled:text-white mx-auto cursor-pointer w-[50%] rounded-3xl text-white/60 hover:text-white transition-all duration-300 font-sans font-bold hover:bg-sky-800 px-5 py-3 bg-sky-800/60'>
          <span className='mb-1/2'>{isSubmitting ? 'Creating...' : 'Create Book'}</span>
          <lord-icon
            src="https://cdn.lordicon.com/dwoxxgps.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: 25, height: 25 }}>
          </lord-icon>
        </button>
      </form>
    </div>
  )
}

export default AddBook
