import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import {
  quizData1,
  quizData2,
  quizData3,
  quizData4,
  quizData5,
  quizData6,
  quizData7,
} from './data';

function App() {
  const [activeQuiz, setActiveQuiz] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  const [quizStates, setQuizStates] = useState({
    0: { selectedAnswers: {}, showResults: false, score: 0 },
    1: { selectedAnswers: {}, showResults: false, score: 0 },
    2: { selectedAnswers: {}, showResults: false, score: 0 },
    3: { selectedAnswers: {}, showResults: false, score: 0 },
    4: { selectedAnswers: {}, showResults: false, score: 0 },
    5: { selectedAnswers: {}, showResults: false, score: 0 },
    6: { selectedAnswers: {}, showResults: false, score: 0 },
  });

  const quizzes = [
    { data: quizData1, title: "Kubernetes Quiz 1" },
    { data: quizData2, title: "Kubernetes Quiz 2" },
    { data: quizData3, title: "Kubernetes Quiz 3" },
    { data: quizData4, title: "Kubernetes Quiz 4" },
    { data: quizData5, title: "Kubernetes Quiz 5" },
    { data: quizData6, title: "Kubernetes Quiz 6" },
    { data: quizData7, title: "Kubernetes Quiz 7" },
  ];

  const handleAnswerChange = (quizIndex, questionIndex, option) => {
    setQuizStates((prev) => ({
      ...prev,
      [quizIndex]: {
        ...prev[quizIndex],
        selectedAnswers: {
          ...prev[quizIndex].selectedAnswers,
          [questionIndex]: option,
        },
      },
    }));
  };

  const handleSubmit = (quizIndex) => {
    let newScore = 0;
    quizzes[quizIndex].data.forEach((q, index) => {
      const selectedOption = quizStates[quizIndex].selectedAnswers[index];
      if (selectedOption) {
        if (
          selectedOption === q.correctAnswer ||
          selectedOption.startsWith(q.correctAnswer + ".")
        ) {
          newScore += 1;
        }
      }
    });
    setQuizStates((prev) => ({
      ...prev,
      [quizIndex]: {
        ...prev[quizIndex],
        score: newScore,
        showResults: true,
      },
    }));
  };

  const handleRestart = (quizIndex) => {
    setQuizStates((prev) => ({
      ...prev,
      [quizIndex]: {
        selectedAnswers: {},
        showResults: false,
        score: 0,
      },
    }));
  };

  return (
    <div>
      <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl flex-shrink-0">Kubernetes Prep</div>
          
          {/* Desktop/Tablet Landscape Tabs with Scroll */}
          <div className="hidden lg:flex space-x-2 overflow-x-auto no-scrollbar max-w-full ml-4">
            {quizzes.map((quiz, index) => (
              <button
                key={index}
                onClick={() => setActiveQuiz(index)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeQuiz === index
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-600"
                }`}
                aria-label={`Switch to ${quiz.title}`}
              >
                {quiz.title}
              </button>
            ))}
          </div>

          {/* Mobile/Tablet Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-1"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

      </nav>
      {/* Full Screen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-[60] flex flex-col items-center justify-center space-y-8 transition-opacity duration-300 overflow-y-auto">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2"
          >
            <svg
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col space-y-6 text-center w-full px-4">
            {quizzes.map((quiz, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveQuiz(index);
                  setIsMenuOpen(false);
                }}
                className={`text-2xl font-semibold transition-colors duration-200 py-2 ${
                  activeQuiz === index
                    ? "text-blue-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {quiz.title}
              </button>
            ))}
          </div>
        </div>
      )}
      <Quiz
        quizData={quizzes[activeQuiz].data}
        title={quizzes[activeQuiz].title}
        selectedAnswers={quizStates[activeQuiz].selectedAnswers}
        showResults={quizStates[activeQuiz].showResults}
        score={quizStates[activeQuiz].score}
        onAnswerChange={(questionIndex, option) =>
          handleAnswerChange(activeQuiz, questionIndex, option)
        }
        onSubmit={() => handleSubmit(activeQuiz)}
        onRestart={() => handleRestart(activeQuiz)}
      />
    </div>
  );
}

export default App;
