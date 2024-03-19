'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const fetchUser = async (callback) => {
    let a = await fetch('./api/user')
    let data = await a.json()
    callback(data.user)
}

const Navigation = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
        fetchUser(setUser)
    }, [])


    return (
        <div className='flex flex-col gap-8 w-1/3 overflow-hidden fixed bg-black left-0 top-0 min-h-[92vh] border-r-2'>
            <h1 className='font-aladin tracking-[0.09rem] text-2xl font-bold p-5 border-b-2 flex gap-2 items-center'><span className="text-white p-3 rounded-full bg-stone-700 material-symbols-outlined">
                auto_stories
            </span>BookNEXT</h1>
            <Link href={'/'} className='w-fit'><div className="user flex items-center m-3">
                <span className="material-symbols-outlined mx-2">
                    account_circle
                </span><span className='font-semibold text-base'>{user}</span>
            </div></Link>
            <div className="buttons flex flex-col">
                <Link href={'/book'}><div className='btn'><span className="material-symbols-outlined mx-2">
                    add
                </span><span>Add Book</span></div></Link>
                <Link href={'/sale'}><div className='btn'><span className="material-symbols-outlined mx-2">
                    point_of_sale
                </span><span>Add Sale</span></div></Link>
                <Link href={'/view'}><div className='btn'><span className="material-symbols-outlined mx-2">
                    view_list
                </span><span>View Sales</span></div></Link>
            </div>
        </div>
    )
}

export default Navigation