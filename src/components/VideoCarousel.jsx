import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants' 
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const VideoCarousel = function(){
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])


  const [video,setVideo] = useState({
    isEnd:false,
    startPlay:false,
    videoId:0,
    isLastVideo:false,
    isPlaying:false
  })
  const [loadedData,setLoadedData] = useState([])

  const {isEnd,startPlay,videoId,isLastVideo,isPlaying} = video

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(()=>{
    gsap.to('#slider',{
      transform:`translateX(${-100*videoId}%)`,
      duration:2,
      ease:'power2.inOut'
    })
    gsap.to('#video',{
      scrollTrigger:{
        trigger:'#video',
        toggleActions:'restart none none none',
      },
      onComplete:()=>{
        setVideo((pre)=>({...pre,
          isPlaying:true,
          startPlay:true
        }))
      }
     })

  },[isEnd,videoId]);

  useEffect(()=>{
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "6vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "10vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }

  },[videoId,startPlay])

  useEffect(()=>{
    if(loadedData.length>3){
      console.log(loadedData)
      if(!isPlaying){
        videoRef.current[videoId].pause()
      }else{
        startPlay && videoRef.current[videoId].play();
      }
    }

  },[startPlay,isPlaying,loadedData,videoId])
   
  const handleProcess = (type,i)=>{
    switch(type){
      case 'video-end':
        setVideo(prev=>({...prev,isEnd:true,videoId:i+1}))
        break;
      case 'video-last':
        setVideo(prev=>({...prev,isLastVideo:true}))
        break;
      case 'video-reset':
        setVideo(prev=>({...prev,isLastVideo:false,videoId:0}))
        break;
      case 'play':
        setVideo(prev=>({...prev,isPlaying:!prev.isPlaying}))
        break;
      default:
        return video;

    }

  }
  const handleLoadedMetaData = (i,e)=>{
    setLoadedData(prev=>([...prev,e]))
  }

  return (
    <>

    <div className='flex items-center mt-10 lg:ml-20'>
     {hightlightsSlides.map((list,i)=>(
      <div key={list.id} id='slider' className='md:pr-20 pr-10'>
        <div className="video-carousel_container">
          <div className="w-full h-full flex-center overflow-hidden rounded-3xl bg-black">
            <video 
            id='video'
            playsInline={true}
            preload='auto'
            muted
            className={` pointer-events-none`}
            ref={(el)=>videoRef.current[i]=el}
            onEnded={() =>
              i !== 3
                ? handleProcess("video-end", i)
                : handleProcess("video-last")
            }
            onPlay={()=>{
              setVideo(prevVideo=>({...prevVideo,isPlaying:true}))
            }}
            onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)}
               >
              <source src={list.video} type='video/mp4'/>
            </video>
          </div>
          <div className="absolute top-12 left-[5%] z-10">
            {list.textLists.map((text)=>(
              <p key={text} className='md:text-2xl text-xl font-medium'>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
     ))}

    </div>

    <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_,i)=>(
            <span 
            key={i}
            ref={(el)=>videoDivRef.current[i]=el}  
            className='h-3 w-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer'   
            >
              <span 
              className="absolute h-full w-full rounded-full"
              ref={(el)=>videoSpanRef.current[i]=el}
              ></span>

            </span>
          ))}

        </div>
        <button className="control-btn">
          <img src={isLastVideo?replayImg:!isPlaying?playImg:pauseImg} alt={isLastVideo?'replay':!isPlaying?'play':'pause'} 
          onClick={isLastVideo?()=>handleProcess('video-reset'):
            ()=>handleProcess('play')
          }/>
        </button>

     </div>
    </>
  )
}

export default VideoCarousel
