import { JSX } from 'react'
import './App.css'
import Header from './components/headerComponent/Header'
import Home from './components/homeComponent/Home'
import Footer from './components/footerComponent/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './components/logInComponent/LogIn'
import Register from './components/registerComponent/Register'
import { useThemeContext } from './provider/themeProvider'
import Rooms from './components/RoomsComponent/Rooms'

function App():JSX.Element {
  const {theme} = useThemeContext();
  return (
    <BrowserRouter>
      <div className={`${theme}`} data-theme>
      <Header/>
        <main className='ml-50 mr-50 max-md:ml-0 max-md:mr-0 max-lg:ml-25 max-lg:mr-25' data-theme>
          <Routes>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/login' element={<LogIn></LogIn>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/rooms' element={<Rooms></Rooms>}></Route>
            <Route path='*' element={<Home></Home>}></Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
