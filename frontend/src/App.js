import React from 'react'
import Navbar from './components/navbar/Navbar'
import AppRouter from './routes/AppRouter';

const App = () => {

  const [user, setUser] = React.useState("");

  return (
    <>
   
      <Navbar user={user}/>
      <AppRouter/>
     
    </>
   
  )
}

export default App
