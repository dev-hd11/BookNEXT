'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const fetchUser = async (callback) => {
    let a = await fetch('./api/user')
    let data = await a.json()
    callback(data.user)
}

const Navigation = () => {
    const [user, setUser] = useState('')
    const btn1 = useRef()

    useEffect(() => {
        fetchUser(setUser)
    }, [])


    return (
        <div className='flex flex-col gap-8 w-1/3 overflow-hidden fixed bg-black left-0 top-0 min-h-[92vh] border-r-2'>
            <h1 className='font-aladin tracking-[0.09rem] text-2xl font-bold p-5 border-b-2 flex gap-2 items-center'><span className="text-white flex items-center justify-center p-3 rounded-full bg-stone-700">
                <lord-icon
                    src="https://cdn.lordicon.com/lenjvibx.json"
                    trigger="in"
                    delay="1500"
                    stroke="bold"
                    state="in-reveal"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{width: 35, height: 35}}>

                </lord-icon>
            </span>BookNEXT</h1>
            <Link href={'/'} className='w-fit'><div className="user flex items-center m-3">
                <span className="material-symbols-outlined mx-2">
                    account_circle
                </span><span className='font-semibold text-base'>{user}</span>
            </div></Link>
            <div className="buttons flex flex-col">
                <Link href={'/book'}><div className='btn'><lord-icon
                    src="https://cdn.lordicon.com/wzwygmng.json"
                    trigger="morph"
                    state="hover-unfold"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: 35, height: 35 }}
                >
                </lord-icon><span>Add Book</span></div></Link>
                <Link href={'/sale'}><div className='btn'><lord-icon
                    src="https://cdn.lordicon.com/zrkkrrpl.json"
                    trigger="morph"
                    stroke="bold"
                    state="hover-swirl"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{ width: 35, height: 35 }}>
                </lord-icon>
                    <span>Add Sales</span></div></Link>
                <Link href={'/view'}><div className='btn'><lord-icon
                    src="https://cdn.lordicon.com/zawvkqfy.json"
                    trigger="morph"
                    stroke="bold"
                    colors="primary:#ffffff"
                    style={{ width: 35, height: 35 }}>
                </lord-icon><span>View Sales</span></div></Link>
            </div>
        </div>
    )
}

export default Navigation