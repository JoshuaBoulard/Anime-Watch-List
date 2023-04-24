// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import { getToken } from './components/CsrfToken'
import { useEffect, useState } from 'react'
import { currUser } from './utilities'
import { Outlet } from 'react-router'

function App() {
  const [user, setUser] = useState({'name': null, 'profile_image': null})
  getToken()

  useEffect(()=>{
    const getCurrUser = async() =>{
      setUser(await currUser())
    }
   getCurrUser()
  }, [])

  return (
    <div id="app_root">

      <Header data={user}/>

      <Outlet/>

    </div>
  )
}

export default App
