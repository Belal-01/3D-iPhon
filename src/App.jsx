
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'
import * as Sentry from '@sentry/react'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import Modle from './components/Modle'
import { Suspense } from 'react'
import Loader from './components/Loader'
import { useStore } from '../store'



function App() {
  const Loaded = useStore((store)=>store.Loaded)
  console.log(Loaded)

  return (
    <>
        <main className='bg-black'>
          {Loaded?
          <>
            <Navbar />
            <Hero />
            <Highlights/>
            <Modle/>
            <Features/>
            <HowItWorks />
            <Footer />
          </>
            :<Loader/>
            } 
        </main>

    </>
  )
}

export default Sentry.withProfiler(App)
