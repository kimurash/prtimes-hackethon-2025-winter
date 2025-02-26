import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from './pages/LoginPage'

const root = document.getElementById("root");



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
