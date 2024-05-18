import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../components/auth/Auth'
import AddSpace from '../components/addSpace/AddSpace'
import Demo from '../pages/Demo'

const AppRouter = () => {
  return (
    <Routes>
        <Route path ='/' element ={<Home/>}/>
        <Route path='/signin' element={<Auth/>}/>
        <Route path='/spaces' element={<AddSpace/>}/>
        <Route path='/demo' element={<Demo/>}/>
    </Routes>
  )
}

export default AppRouter
