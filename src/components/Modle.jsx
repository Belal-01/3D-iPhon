import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { yellowImg } from '../utils'
import * as THREE from 'three'
import ModleView from './ModleView'
import { Canvas } from '@react-three/fiber'
import { models, sizes } from '../constants'
import { View } from '@react-three/drei'
import { Timeline } from 'gsap/gsap-core'
import { animateWithGsapTimeLine } from './animations'

const Modle = () => {

    const [size,setSize] = useState('small')
    const [modle,setModle] = useState({
      title:"iPhone 15 Pro in Natural Titanium",
      color:["#8F8A81",'#FFE789','#6F6C64'],
      img:yellowImg,
    })
    //camera control for the modle view 
    const cameraControllSmall = useRef()
    const cameraControlLarg = useRef()

    // modle
    const small = useRef(new THREE.Group())
    const larg = useRef(new THREE.Group())

    //rotation 
    const [smallRotation,setSmallRotation ]=useState(0)
    const [largRotation , setLargRotation] = useState(0)

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=>{
    gsap.to('#modleTitle',{
      opacity:1,
      y:0,
      scrollTrigger:{
        trigger:'#modleTitle',
        start:"bottom bottom"
      }
      
    })
  })
  const tl = gsap.timeline();
  useEffect(()=>{
    if(size==='large'){
      animateWithGsapTimeLine(tl,small,smallRotation,'#view1','#view2',{transform:'translateX(-140%)',duration:2})
    }
    if(size==='small'){
      animateWithGsapTimeLine(tl,larg,largRotation,'#view2','#view1',{transform:'translateX(0)',duration:2})
    }

  },[size])
  return (
    <section className='common-padding'>
      <div className="screen-max-width">
        <h1 id='modleTitle' className="section-heading">
          Take a closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="flex justify-center w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModleView 
            index={1}
            groupRef={small}
            gsapType="view1"
            controlRef = {cameraControllSmall}
            setRotationState = {setSmallRotation}
            item = {modle}
            size = {size}
            />
             <ModleView 
            index={2}
            groupRef={larg}
            gsapType="view2"
            controlRef = {cameraControlLarg}
            setRotationState = {setLargRotation}
            item = {modle}
            size = {size}
            />
            <Canvas className='w-full h-full'
            style={{
              position:'fixed',
              top:'0',
              left:'0',
              right:'0',
              bottom:'0',
              overflow:'hidden'
            }}
            eventSource={document.getElementById('root')}
            >
              <View.Port/>
            </Canvas>


          </div>
          <div className="mx-auto w-full">
            <p className='text-sm font-light text-center my-5'>{modle.title}</p>
            <div className="flex-center">
              <ul className='color-container'>
                {models.map((item,i)=>{
                return(  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{
                    backgroundColor:item.color[0]
                  }}
                  onClick={()=>setModle(item)}></li>)
                })}

              </ul>
              <button className="size-btn-container">
                {sizes.map(({label,value})=>{
                 return(<span key={label} className="size-btn"
                 style={{
                  backgroundColor:size===value?'white':'transparent',
                  color:size===value?'black':'white'
                 }}
                 onClick={()=>setSize(value)}>
                    {label}
                  </span>)
                })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modle
