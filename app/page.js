'use client'
import { useState, useEffect } from "react";

export default function Home() {
  const [sales, setSales] = useState(0)
  const [user, setUser] = useState('')
  const [remark, setRemark] = useState('')
  const [color, setColor] = useState('')

  const fetchUser = async (callback) => {
    let a = await fetch('./api/user')
    let data = await a.json()
    callback(data.user)
  }

  const fetchSale = async (callback) => {
    const date = new Date()
    const dateStr = `${date.getFullYear()}-${date.getMonth()}`
    let a =await fetch('/api/sale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date: dateStr})
    })
    let data = await a.json()

    if (data.sale >= 100_000) {
      setRemark('Good')
      setColor('text-green-500')
    } else if (data.sale >= 50_000) {
      setRemark('Optimal')
      setColor('text-white')
    } else {
      setRemark('Bad')
      setColor('text-red-600')
    }

    if (data.sale > 999_000) {
      callback((data.sale / 1_000_000).toFixed(3).toString() + 'M')
    } else if (data.sale > 9_000) {
      callback((data.sale / 1_000).toFixed(3).toString() + 'K')
    } else {
      callback(data.sale)
    }
  }

  useEffect(() => {
    fetchUser(setUser)
    fetchSale(setSales)
  }, [])


  return (
    <div className="screen flex flex-col items-center">
      <h1 className="font-extrabold text-4xl w-full text-center font-aboreto p-[10vh] border-b-2 h-fit">Welcome back, <span style={{'fontFamily' : 'Oleo Script Swash Caps'}}>{user}</span></h1>
      <div className=" my-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-3xl flex items-center justify-center w-[60%]">
        <div className="total p-1 rounded-3xl bg-gradient-to-br from-slate-600 via-slate-800 to-black border-2 w-full">
          <div className="font-outline text-xl flex justify-between text-red-600 w-full font-bold p-2 border-b-2">
            <p className={color}>Monthly Sales</p>
            <p className={color}>{remark}</p>
          </div>
          <div className={"flex font-outline text-5xl items-center justify-center px-[20vh] py-[10vh] " + color}> ${sales}</div>
        </div>
      </div>
    </div>
  );
}
