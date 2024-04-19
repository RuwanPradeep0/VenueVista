import React from 'react'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Home from './pages/Home';
import AddSpace from './components/AddSpace';

const App = () => {

  const [user, setUser] = React.useState("");

  return (
    <>
   
      <Navbar user={user}/>
   

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Auth/>}/>
      <Route path='/spaces' element={<AddSpace/>}/>
      </Routes>
    </>
   
  )
}

export default App
