import { useState } from 'react'
import "./index.css"
import Home from './pages/home'
import { Routes,Route } from 'react-router-dom';
import { Categories } from './pages/categories';
import Quiz from './pages/quiz';
import Layout from './components/layout';
function App() {
  

  return (
   <Layout >
       <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz/:id" element={<Quiz />} />

      </Routes>
   </Layout>
   

  )
}

export default App
