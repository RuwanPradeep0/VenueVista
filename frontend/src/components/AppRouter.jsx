import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Auth from './auth/Auth'
import ManageReservation from '../pages/ManageReservation';

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/venuvista' element={<Home/>}/>
        <Route path='/venuvista/signin' element={<Auth/>}/>
        <Route path='/venuvista/ManageReservations' element={<ManageReservation/>}/>
    </Routes>
  )
}

export default AppRouter
