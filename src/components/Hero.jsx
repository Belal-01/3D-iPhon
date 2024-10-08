import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { heroVideo,smallHeroVideo } from '../utils'


const Hero = () => {
  const [videosrc,setVideoSrc] = useState(()=>window.innerWidth>760?heroVideo:smallHeroVideo)

  const handleVideoSrc = ()=>{
    if(window.innerWidth>640)
      setVideoSrc(heroVideo)
    else
      setVideoSrc(smallHeroVideo)
  }
  useEffect(()=>{
    window.addEventListener('resize',handleVideoSrc)
    return ()=>{
      window.removeEventListener('resize',handleVideoSrc)
    }
  },[])
  useGSAP(()=>{
    gsap.to('#hero',{
      opacity:1,
      delay:2,

    })
    gsap.to('#cta',{
      opacity:1,
      y:-25,
      delay:2
    })
  },[])
  return (
    <section className="w-full nav-height bg-black relative py-6">
      <div className="h-5/6 px-10 w-full flex-center flex-col">
        <p className='hero-title' id='hero'>iPhone 15 Pro</p>
      <div className="md:w-10/12 w-9/12">
        <video autoPlay muted playsInline={true} key={videosrc} className='pointer-events-none'>
          <source src={videosrc} type='video/mp4'/>
        </video>
      </div>
      </div>

      <div id='cta' className="flex-center flex-col itmes-center opacity-0 translate-y-20">
        <a href="#highlights" target="_blank" className='btn'>
          Buy
        </a>
        <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
