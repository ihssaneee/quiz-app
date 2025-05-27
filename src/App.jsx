import { useState } from 'react'
import "./index.css"
import Home from './pages/home'
import { Routes,Route } from 'react-router-dom';
import { Categories } from './pages/categories';
import Quiz from './components/quiz/quiz';
import Layout from './components/layout';
import QuizSummary from './components/quiz/quizSummary';
import QuizResult from './components/quiz/quizResult';
import SignUp from './components/sign_up/EmailSignUp';
import SignUpForm from './components/sign_up/signUpForm';
function App() {
  

  return (
    <>
   <Routes>
  {/* Routes with layout */}
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/quiz/:id" element={<Quiz />} />
    <Route path="/result" element={<QuizResult />} />
    <Route path="/quiz_summary" element={<QuizSummary />} />
  </Route>
  {/* Route without layout */}
  <Route path="/signUp" element={<SignUp />} />
  
</Routes>
   </>

   

  )
}

export default App
