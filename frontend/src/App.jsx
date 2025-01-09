import React, { useContext, useEffect } from 'react'
import { AuthProvider } from './store/AuthStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
