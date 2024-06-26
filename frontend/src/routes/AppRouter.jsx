import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Auth from '../components/auth/Auth'
import AddSpace from '../components/addSpace/AddSpace'
import ManageReservation from '../pages/manageReservations/ManageReservation'

const AppRouter = () => {
  return (
    <Routes>
        <Route path ='/' element ={<Home/>}/>
        <Route path='/signin' element={<Auth/>}/>
        <Route path='/spaces' element={<AddSpace/>}/>
        <Route path ='/managereservations' element={<ManageReservation/>}/>
    </Routes>
  )       
}

export default AppRouter
