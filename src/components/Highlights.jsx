import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'



const Highlights = () => {
  useGSAP(()=>{
    gsap.to('#title',{
      opacity:1,
      y:0
      
    })
    gsap.to('.link',{
      opacity:1,
      y:0,
      duration:1,
      stagger:{
        amount:.25,
      }
    })
  },[])
  return (
    <section id='highlights' className='w-screen h-full overflow-hidden common-padding bg-zinc'>
      <div className="screen-max-width">
        <div className='md:flex justify-between flex-wrap items-end'>
          <h1 id='title' className='section-heading'> Get the highlights</h1>
          <div className="flex flex-wrap  items-end ">
            <p className='link mx-2'>Watch the film 
              <img src={watchImg} alt="watch" className='ml-2'/>
            </p>
            <p className='link mx-2'>Watch the event 
              <img src={watchImg} alt="watch" className='ml-2'/>
            </p>
          </div>
        </div>

      </div>

      <VideoCarousel />
    </section>
  )
}

export default Highlights
