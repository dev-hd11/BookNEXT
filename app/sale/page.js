'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const AddSale = () => {
  const [options, setOptions] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      let a = await fetch('./api/data')
      let data = await a.json()
      setOptions(data)
    }

    fetchData()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    let x = await fetch('/api/new_sale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let y = await x.json()

    if (y.status == 'ok') {
      router.push('/')
    }

  };

  return (
    <div className='screen flex flex-col items-center'>
      <h1 className="font-extrabold flex items-center justify-between text-4xl w-full font-aboreto p-[10vh] border-b-2 h-fit">
        <span>Add a Sale</span>
        <Link href={'/'} className='text-slate-400 hover:text-white'><lord-icon
          src="https://cdn.lordicon.com/nqtddedc.json"
          trigger="morph"
          state="hover-cross-3"
          colors="primary:#e8308c"
          style={{ width: 50, height: 50 }}>
        </lord-icon></Link>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-4 m-4 bg-white/10 backdrop-blur-sm gap-4 justify-center h-[40%] my-auto w-1/2 rounded-xl'>
        <p className='text-white ml-[25%]'>Book Name:</p>
        <select {...register('bookName')} className='bg-black text-white py-3 mx-auto w-[50%] rounded-2xl px-6'>
          <option className='bg-black text-white' value="">Select an option</option>
          {options.map(option => (
            <option className='bg-black text-white' key={option.book_id} value={option.name}>{option.name}</option>
          ))}
        </select>
        {errors.bookName && <span className="m-5 text-red-600 mx-auto font-extrabold text-sm">Please select an option</span>}
        <button type="submit" disabled={isSubmitting} className='disabled:bg-sky-800/20 flex gap-2 justify-center items-center disabled:text-white mx-auto cursor-pointer w-[50%] rounded-3xl text-white/60 hover:text-white transition-all duration-300 font-sans font-bold hover:bg-sky-800 px-5 py-3 bg-sky-800/60'>
          <span className='mb-1/2'>{isSubmitting ? 'Creating...' : 'Create Sale'}</span>
          <lord-icon
            src="https://cdn.lordicon.com/dwoxxgps.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{width: 25, height: 25}}>
          </lord-icon>
        </button>
      </form>
    </div>
  )
}

export default AddSale
