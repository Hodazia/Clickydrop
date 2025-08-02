import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Landing />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
