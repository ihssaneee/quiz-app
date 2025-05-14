import { useState } from 'react'
import "./index.css"
import Home from './pages/home'
import { Routes,Route } from 'react-router-dom';
import { Categories } from './pages/categories';
import Quiz from './pages/quiz';
function App() {
  

  return (
   
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz/:id" element={<Quiz />} />

      </Routes>

  )
}

export default App
