
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Highlights from './components/Highlights'
import Modle from './components/modle'

function App() {
  

  return (
    <>
     <main className='bg-black'>
      <Navbar />
      <Hero />
      <Highlights/>
      <Modle />
      
     </main>
    </>
  )
}

export default App
