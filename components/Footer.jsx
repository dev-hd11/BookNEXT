import React from 'react'

const Footer = () => {
  return (
    <div className='flex items-center justify-around border-t-2 border-slate-600 bg-black sticky bottom-0'>
      <p className='border-r-2 p-4 flex items-center justify-center border-slate-600 w-1/3'>Copyright &copy; 2024 <span className='font-bold text-xl font-serif ml-2 font-aladin tracking-[0.09rem] '>BookNEXT</span> - All rights reserved</p>
      <p className='border-r-2 p-4 flex items-center justify-center border-slate-600 w-1/3'>Copyright Holder & Creator, Himank Deka</p>
      <p className='border-r-2 p-4 flex items-center justify-center border-slate-600 w-1/3'>Licensed under 3-Clause BSD License</p>
    </div>
  )
}

export default Footer
