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
    console.log(data)
    callback(data.user)
  }

  useEffect(() => {
    fetchUser(setUser)
    
    if (sales >= 50_000) {
      setRemark('Good')
      setColor('text-green-500')
    } else if (sales >= 10_000) {
      setRemark('Optimal')
      setColor('text-white')
    } else {
      setRemark('Bad')
      setColor('text-red-600')
    }

    if (sales.toString().length > 6) {
      setSales((sales / 1_000_000).toString() + 'M')
    } else if (sales.toString().length > 4) {
      setSales((sales / 1_000).toString() + 'K')
    }
  }, [])


  return (
    <div className="screen flex flex-col items-center">
      <h1 className="font-extrabold text-5xl w-full text-center font-aboreto p-[10vh] border-b-2 h-fit">Welcome back, <span style={{'fontFamily' : 'Fleur De Leah'}}>{user}</span></h1>
      <div className=" my-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-3xl flex items-center justify-center w-[60%]">
        <div className="total p-1 rounded-3xl bg-gradient-to-br from-slate-600 via-slate-800 to-black border-2 w-full">
          <div className="font-outline text-xl flex justify-between text-red-600 w-full font-bold p-2 border-b-2">
            <p>Total Sales</p>
            <p className={color}>{remark}</p>
          </div>
          <div className="flex font-outline text-5xl items-center justify-center text-red-600 px-[20vh] py-[10vh]">${sales}</div>
        </div>
      </div>
    </div>
  );
}
