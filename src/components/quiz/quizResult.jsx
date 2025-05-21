import React from 'react'
import { Link } from 'react-router-dom'

const QuizResult = ({score,questionsLength,restart,questions,answers}) => {
    const LinkStyle="w-auto p-3 text-white bg-cyan-700 rounded-2xl hover:bg-cyan-600 cursor-pointer"
  return (
    <div className='flex flex-col gap-4 items-center '>
        <div className='flex flex-col gap-4 '>
            <h2 className=' font-medium text-gray-800 text-5xl '>Result</h2>
        </div>
        <div className="text-2xl ">
            {score} of {questionsLength}
        </div>
        <div className='text-lg font-bold text-gray-900'>
            {score/questionsLength *100} %
        </div>
        <div className='flex gap-3 py-6'>
            <Link to="/quiz_summary" className={LinkStyle} state={{questions, answers}} >Check Your Answers</Link>
            <button onClick={restart} className="w-auto p-3 cursor-pointer text-white bg-cyan-600 rounded-2xl hover:bg-cyan-500" >Try Again</button>
            <Link to="/categories" className={LinkStyle} >Back to Quizzes</Link>
        </div>
    </div>
  )
}

export default QuizResult