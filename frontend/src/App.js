import React from 'react'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Home from './pages/Home';

const App = () => {

  const [user, setUser] = React.useState("");

  return (
    <>
     {/* <div>
      <Navbar user={user}/>
    </div> */}

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Auth/>}/>
      </Routes>
    </>
   
  )
}

export default App
