import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../components/auth/Auth'
import AddSpace from '../components/addSpace/AddSpace'

const AppRouter = () => {
  return (
    <Routes>
        <Route path ='/' element ={<Home/>}/>
        <Route path='/signin' element={<Auth/>}/>
        <Route path='/spaces' element={<AddSpace/>}/>
    </Routes>
  )
}

export default AppRouter
