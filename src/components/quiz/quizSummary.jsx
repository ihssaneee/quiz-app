import React from "react";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
const QuizSummary = () => {
  const location = useLocation();
  const { questions, answers } = location.state || {};
  const optionStyle = (option, questionIndex, correctAnswer) => {
    if (questionIndex in answers && option === answers[questionIndex]) {
      return option === correctAnswer
        ? "bg-green-400 text-white hover:bg-green-400"
        : "bg-red-400 text-white hover:bg-red-400";
    }
    return (
      option === correctAnswer && "bg-green-400 text-white hover:bg-green-400"
    );
  };
  console.log(questions ? questions : "no questions");
  return (
    <div className="m-8 flex flex-col gap-4  font-poppins ">
      {questions.map((q, index) => (
        <div className="border-b p-3 border-neutral-300 flex flex-col gap-3">
          <h2 className="text-2xl text-cyan-800 font-medium ">
            Question {index + 1}
          </h2>
          <p className="text-lg  ">{q.question}</p>
          {q.options.map((option) => (
            <div
              key={option}
              className={
                optionStyle(option, index, q.correctAnswer) +
                ` lg:w-1/2  flex items-center justify-between border p-3  border-neutral-200 shadow lg:min-w-3xs w-full cursor-pointer text-cyan-800 hover:bg-cyan-50  rounded-2xl`
              }
            >
              <div className="flex items-center gap-1">
                {index in answers && option === answers[index] ? (
                  option === q.correctAnswer ? (
                    <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  ) : (
                    <HighlightOffOutlinedIcon fontSize="large" />
                  )
                ) : null}
                <h3 className={`  text-[20px]   `}>{option}</h3>
              </div>
              {index in answers && answers[index] === option && (
                <span className="bg-cyan-200 text-gray-700 p-2 rounded-2xl text-center">
                  Your answer
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizSummary;
