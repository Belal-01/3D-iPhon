import { Html } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">
          <span className='w-4 h-4 bg-sky-500 border-r-4'></span>
        </div>
      </div>
    </Html>
  )
}

export default Loader