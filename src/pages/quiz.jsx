import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDocs, collection, db, doc } from "../services/firebase.js";
import { Header } from "../components/Header.jsx";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState({});

  const handleNextClick = (option) => {
    setQuestionIndex((prev) => prev + 1);
  };
  const handleBackClick = () => {
    setQuestionIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const categoryDocRef = doc(db, "categories", id);
        const questionsSubcollectionRef = collection(
          categoryDocRef,
          "questions"
        );
        const querySnapshot = await getDocs(questionsSubcollectionRef);
        const quizQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(quizQuestions);
        console.log("questions fetched successfully.", quizQuestions);
      } catch (error) {
        console.error("could not fetch questions data", error);
      }
    };
    fetchQuestions();
  }, []);
  const currentQuestion = questions[questionIndex];
  const handleAnswer = (option) => {
    if (questionIndex in isAnswered) {
      return;
    }
    setIsAnswered((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      console.log("correct answer");
    } else {
      console.log("wrong answer");
    }
  };
  const optionStyle = (option) => {
    if (questionIndex in isAnswered) {
      const selectedAnswer = isAnswered[questionIndex];
      const correctAnswer = currentQuestion.correctAnswer;
      if (selectedAnswer === option) {
        let style =
          option === correctAnswer
            ? "bg-green-400 text-gray-50 hover:bg-green-400 "
            : "bg-red-400 hover:bg-red-400 text-gray-50";
        return style;
      }
      if (option === correctAnswer) {
        let style = "bg-green-400 text-gray-50 hover:bg-green-400";
        return style;
      }
    }
    return "";
  };

  currentQuestion && console.log(currentQuestion);
  const handleRestart = () => {
    setIsAnswered({});
    setQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="font-poppins ">
    
        
      {questionIndex < questions.length ? (
        <div className=" mx-auto p-6 ">
          <div className="font-poppins lg:max-w-4xl w-full mx-auto border-neutral-200  rounded-3xl  text-cyan-800 border shadow ">
            <h2 className="text-center p-5 text-2xl  ">
              {currentQuestion && currentQuestion.question}
            </h2>
          </div>
          <div className="flex  items-center flex-col gap-9 my-8 ">
            {currentQuestion &&
              currentQuestion.options.map((option, index) => (
                <div
                  onClick={() => handleAnswer(option)}
                  className={
                    optionStyle(option) +
                    ` lg:w-1/2  flex items-center justify-between border px-3 border-neutral-200 shadow lg:min-w-3xs w-full cursor-pointer text-cyan-800 hover:bg-cyan-50  rounded-2xl`
                  }
                  key={index}
                >
                  <h1 className={` text-[20px] p-3  `}>{option}</h1>
                  {questionIndex in isAnswered &&
                  isAnswered[questionIndex] === option ? (
                    option === currentQuestion.correctAnswer ? (
                      <CheckCircleOutlineOutlinedIcon fontSize="large" />
                    ) : (
                      <HighlightOffOutlinedIcon fontSize="large">
                        :
                      </HighlightOffOutlinedIcon>
                    )
                  ) : null}
                </div>
              ))}
          </div>
          <div className="flex items-center justify-center gap-8">
            <span className="text-lg text-cyan-950 font-medium">
              Question {questionIndex + 1} of {questions.length}
            </span>
            <button
              disabled={questionIndex <= 0}
              className="p-3 disabled:opacity-25 disabled:cursor-not-allowed not-disabled:cursor-pointer text-lg hover:bg-cyan-500 text-white bg-cyan-600 transition-colors duration-400 ease-in-out w-28 rounded-2xl"
              onClick={handleBackClick}
            >
              Back
            </button>
            <button
              className="p-3 text-lg cursor-pointer text-white hover:bg-cyan-500 transition-colors duration-400 ease-in-out bg-cyan-600 w-28 rounded-2xl"
              onClick={handleNextClick}
            >
              next
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-cyan-600 flex flex-col gap-6 py-20 rounded-2xl justify-center  items-center p-4 mx-auto my-8 max-w-lg">
          <span className="text-white text-4xl font-bold">
            {" "}
            Your score: {score}/{questions.length}{" "}
          </span>
          <span className="text-white text-2xl font-medium">
            Want to try again ?{" "}
          </span>
          <button
            onClick={handleRestart}
            className="cursor-pointer text-white bg-cyan-500 w-auto mx-auto text-center p-4 px-6 rounded-2xl text-[20px] hover:bg-cyan-400 font-medium"
          >
            Restart
          </button>
          <span className="text-white text-2xl font-medium">or</span>
          <Link
            to="/categories"
            className="cursor-pointer font-medium text-white bg-cyan-500 w-auto mx-auto text-center p-4 rounded-2xl text-lg hover:bg-cyan-400"
          >
            Go to Categories
          </Link>
        </div>
      )}
    </div>
  );
};

export default Quiz;
