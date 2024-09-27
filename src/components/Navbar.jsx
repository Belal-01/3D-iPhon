import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-4 flex justify-between items-center'>
      <nav className='flex justify-between items-center w-full screen-max-width'>
        <img src={appleImg} alt="Apple" width={14} height={18}/>
        <div className='flex justify-center max-sm:hidden'>
          {navLists.map((nav)=>(
            <div key={nav} className='px-4 cursor-pointer text-sm text-gray hover:text-white transition-all'>
              {nav}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search" />
          <img src={bagImg} alt="bag" />

        </div>

      </nav>
    </header>
  )
}

export default Navbar
