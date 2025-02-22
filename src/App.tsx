import { JSX } from 'react'
import './App.css'
import Header from './components/headerComponent/Header'
import Home from './components/homeComponent/Home'
import Footer from './components/footerComponent/Footer'

function App():JSX.Element {
  return (
    <div className='light-theme' data-theme>
      <Header/>
      <main className='ml-50 mr-50 max-md:ml-0 max-md:mr-0 max-lg:ml-25 max-lg:mr-25' data-theme>
        <Home/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
