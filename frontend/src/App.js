import React from 'react'
import Navbar from './components/Navbar'
import AppRouter from "./components/AppRouter";
const App = () => {

  const [user, setUser] = React.useState("Ruwan");

  return (
    <div>
      <Navbar user={user}/>
      <AppRouter />
    </div>
  )
}

export default App
