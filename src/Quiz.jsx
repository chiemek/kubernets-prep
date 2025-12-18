import React from 'react';

function Quiz({
  quizData,
  title,
  selectedAnswers,
  showResults,
  score,
  onAnswerChange,
  onSubmit,
  onRestart,
}) {
  if (!quizData || !Array.isArray(quizData) || quizData.length === 0) {
    return (
      <div className="text-center text-red-400">
        Error: Quiz data is not available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-gray-800/80 backdrop-blur border border-gray-700 rounded-xl shadow-2xl w-full">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8 text-blue-400 break-words">
        {title}
      </h1>
      {showResults ? (
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 text-green-400">
            Score: {score} / {quizData.length}
          </h2>
          <p className="mb-4 md:mb-6 text-sm md:text-base lg:text-lg text-gray-300">
            Percentage: {((score / quizData.length) * 100).toFixed(2)}%
          </p>
          <button
            onClick={onRestart}
            className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:bg-blue-700 transition text-xs md:text-sm lg:text-base font-medium shadow-lg shadow-blue-500/30"
          >
            Restart Quiz
          </button>
          <div className="mt-6 md:mt-8 space-y-4 md:space-y-6 text-left">
            {quizData.map((q, index) => (
              <div key={index} className="p-4 md:p-5 bg-gray-700/50 border border-gray-600 rounded-lg">
                <h3 className="text-base md:text-lg lg:text-xl font-medium mb-2 text-gray-100">{q.question}</h3>
                <p className="font-semibold text-yellow-400 text-xs md:text-sm lg:text-base">
                  Your Answer: {selectedAnswers[index] || "Not answered"}
                </p>
                <p className="font-semibold text-green-400 text-xs md:text-sm lg:text-base">
                  Correct Answer: {q.correctAnswer}
                </p>
                <p className="mt-2 text-xs md:text-sm lg:text-base text-gray-300">{q.explanation}</p>
                {q.competency && (
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 mt-2">
                    Competency: {q.competency}
                  </p>
                )}
                {q.domain && (
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 mt-2">
                    Domain: {q.domain}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {quizData.map((q, index) => (
            <div key={index} className="p-4 md:p-5 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors duration-200">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4 text-gray-100">
                Question {index + 1}: {q.question}
              </h2>
              <div className="space-y-2 md:space-y-3">
                {q.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="flex items-start space-x-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name={`question${index}`}
                      checked={selectedAnswers[index] === option}
                      onChange={() => onAnswerChange(index, option)}
                      className="form-radio h-4 w-4 md:h-5 md:w-5 text-blue-500 mt-1 flex-shrink-0 bg-gray-600 border-gray-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                      aria-label={`${q.question} option ${option}`}
                    />
                    <span className="text-xs md:text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <button
              onClick={onSubmit}
              className="bg-green-600 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:bg-green-700 transition text-xs md:text-sm lg:text-base font-medium shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              disabled={
                Object.keys(selectedAnswers).length < quizData.length
              }
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
