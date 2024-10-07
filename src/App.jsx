
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'
import * as Sentry from '@sentry/react'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import Modle from './components/Modle'

function App() {


  return (
    <>
     <main className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights/>
      <Modle/>
      <Features/>
      <HowItWorks />
      <Footer />
      
     </main>
    </>
  )
}

export default Sentry.withProfiler(App)
