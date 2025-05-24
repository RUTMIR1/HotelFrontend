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
import Room from './components/RoomComponent/Room'
import Profile from './components/profileComponent/Profile'
import UserManage from './components/manageComponent/UserManage'
import UserForm from './components/formsComponents/UserForm'
import RoomManage from './components/manageComponent/RoomManage'
import RoomForm from './components/formsComponents/RoomForm'
import ReserveManage from './components/manageComponent/ReserveManage'
import ReserveForm from './components/formsComponents/ReserveForm'
import RolManage from './components/manageComponent/RolManage'
import RolForm from './components/formsComponents/RolForm'
import CategoryManage from './components/manageComponent/categoryManage'
import CategoryForm from './components/formsComponents/CategoryForm'


function App():JSX.Element {
  const {theme} = useThemeContext();
  return (
    <BrowserRouter>
      <div className={`${theme}`} data-theme>
      <Header/>
        <main className='ml-50 mr-50 max-md:ml-0 max-md:mr-0 max-lg:ml-25 max-lg:mr-25 min-h-screen' data-theme>
          <Routes>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/login' element={<LogIn></LogIn>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/rooms' element={<Rooms></Rooms>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/profile/manage/user' element={<UserManage></UserManage>}></Route>
            <Route path='/profile/manage/user/form' element={<UserForm></UserForm>}></Route>
            <Route path='/profile/manage/room' element={<RoomManage></RoomManage>}></Route>
            <Route path='/profile/manage/room/form' element={<RoomForm></RoomForm>}></Route>
            <Route path='/profile/manage/reservation' element={<ReserveManage></ReserveManage>}></Route>
            <Route path='/profile/manage/reservation/form' element={<ReserveForm></ReserveForm>}></Route>
            <Route path='/profile/manage/category' element={<CategoryManage></CategoryManage>}></Route>
            <Route path='/profile/manage/category/form' element={<CategoryForm></CategoryForm>}></Route>
            <Route path='/profile/manage/rol' element={<RolManage></RolManage>}></Route>
            <Route path='/profile/manage/rol/form' element={<RolForm></RolForm>}></Route>
            <Route path='/rooms/room/:id' element={<Room></Room>}></Route>
            <Route path='*' element={<Home></Home>}></Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
