
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
import { Loader } from '@react-three/drei'


function App() {


  return (
    <>
      {/* <Suspense fallback={<Loader/>}> */}
        <main className='bg-black'>
            <Loader />
            <Navbar />
            <Hero />
            <Highlights/>
            <Modle/>
            <Features/>
            <HowItWorks />
            <Footer />

        </main>
      {/* </Suspense> */}
    </>
  )
}

export default Sentry.withProfiler(App)
