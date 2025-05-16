import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '../../context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b border-gray-300'>
      <h1 onClick={()=>router.push('/')} className='w-28 lg:w-32 cursor-pointer text-3xl font-bold text-blue-500' >SHABEH</h1>
      <button className='bg-blue-500  text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed' disabled>Logout</button>
    </div>
  )
}

export default Navbar