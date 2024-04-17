import React from 'react'
import Navbar from './components/Navbar'

const App = () => {

  const [user, setUser] = React.useState("Ruwan");

  return (
    <div>
      <Navbar user={user}/>
    </div>
  )
}

export default App
