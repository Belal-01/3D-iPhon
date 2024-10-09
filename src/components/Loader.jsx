import { useGSAP } from '@gsap/react'
import { Html } from '@react-three/drei'
import gsap from 'gsap'
import React from 'react'

const Loader = () => {

  useGSAP(()=>{
    gsap.to('.loadDot',{
      translateX:'40px',
      duration:0.8,
      yoyo:true,
      repeat:-1,
      rotate:360,
      stagger:{
        amount:1.8,
        from:'end',
        ease:'cric.inOut'
      }
    })
  },[])
  return (
    <Html>
    
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="flex gap-4 w-[20vw] h-[10vw] rounded-full">
          <div className='loadDot w-1 h-5 bg-slate-100 rounded-full'></div>
          <div className='loadDot w-1 h-5 bg-slate-100 rounded-full'></div>
          <div className='loadDot w-1 h-5 bg-slate-100 rounded-full'></div>
          <div className='loadDot w-1 h-5 bg-slate-100 rounded-full'></div>

        </div>
      </div>
    </Html>
  )
}

export default Loader