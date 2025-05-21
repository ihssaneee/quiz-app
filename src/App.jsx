import { useState } from 'react'
import "./index.css"
import Home from './pages/home'
import { Routes,Route } from 'react-router-dom';
import { Categories } from './pages/categories';
import Quiz from './components/quiz/quiz';
import Layout from './components/layout';
import QuizSummary from './components/quiz/quizSummary';
import QuizResult from './components/quiz/quizResult';
function App() {
  

  return (
   <Layout >
       <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<QuizResult />} />
        <Route path="/quiz_summary" element={<QuizSummary />} />

      </Routes>
   </Layout>
   

  )
}

export default App
