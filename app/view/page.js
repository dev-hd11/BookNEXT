'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const ViewSales = () => {
  const [books, setBooks] = useState([])
  const [sales, setSales] = useState(0)
  let count = 1

  const fetchData = async () => {
    let a = await fetch('./api/data')
    let data = await a.json()
    setBooks(data)
  }

  const deleteData = async (book_id) => {
    const choice = confirm('Are you sure?')
    if (choice) {
      let x = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ book_id })
      })

      let y = await x.json()

      if (y.status == 'ok') {
        fetchData()
      }
    }
  }

  useEffect(() => {
    const fetchSale = async () => {
      let a = await fetch('./api/sale')
      let data = await a.json()
      setSales(data.sale)
    }

    fetchData();
    fetchSale()
  }, [])

  return (
    <div className='screen flex flex-col items-center gap-8'>
      <h1 className="font-extrabold flex items-center justify-between text-4xl w-full font-aboreto p-[10vh] border-b-2 h-fit">
        <span>View Sales</span>
        <Link href={'/'} className='text-slate-400 hover:text-white'><lord-icon
          src="https://cdn.lordicon.com/nqtddedc.json"
          trigger="morph"
          state="hover-cross-3"
          colors="primary:#e8308c"
          style={{ width: 50, height: 50 }}>
        </lord-icon></Link>
      </h1>
      {books.length != 0 && <table className='w-full table-auto'>
        <thead>
          <tr className='border-b-2'>
            <th className='m-5 px-12 py-4 font-bold text-xl'>Serial No.</th>
            <th className='m-5 px-12 py-4 font-bold text-xl'>Book</th>
            <th className='m-5 px-12 py-4 font-bold text-xl'>Price</th>
            <th className='m-5 px-12 py-4 font-bold text-xl'>Sales</th>
            <th className='m-5 px-12 py-4 font-bold text-xl'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map(item => {
            let result = count % 2 == 0 ? true : 'odd'
            count += 1
            return (
              <tr key={item.book_id} className={result == 'odd' ? 'bg-slate-600' : 'bg-transparent'}>
                <td className={'m-5 px-12 py-4 text-center'}>{count - 1}.</td>
                <td className={'m-5 px-12 py-4 text-center'}><i><b>{item.name}</b></i></td>
                <td className={'m-5 px-12 py-4 text-center'}>{item.price}</td>
                <td className={'m-5 px-12 py-4 text-center'}>{item.sales}</td>
                <td className={'m-5 px-12 py-4 text-center'}><button className='px-4 py-2 flex items-center justify-center rounded-xl' onClick={() => deleteData(item.book_id)}>
                  <lord-icon
                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                    trigger="morph"
                    state="morph-trash-full-to-empty"
                    colors="primary:#c7166f"
                    style={{ width: 30, height: 30 }}></lord-icon>
                </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>}

      {books.length == 0 && <div className='text-base m-auto'> No Books </div>}

      <p className='font-serif font-bold text-xl mx-auto flex items-center justify-center p-4 my-3 border-y-2 w-full'>Lifetime Sales: ${sales}</p>
    </div>
  )
}

export default ViewSales
