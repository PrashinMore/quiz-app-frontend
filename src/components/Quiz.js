import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        console.log("Location state:", location.state);

        const selectedTopics = location.state?.selectedTopics || [];
        console.log("Selected topics before API call:", selectedTopics);

        if (selectedTopics.length === 0) {
          setError("No topics selected. Please go back and select topics.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/questions?topics=${selectedTopics.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        console.log("API Response:", response.data);
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [location.state]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/questions/check`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setQuizResults(response.data);
      setShowResults(true);
    } catch (err) {
      setError("Failed to submit answers. Please try again.");
      console.error("Error submitting answers:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        Loading questions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        <button
          onClick={() => navigate("/topics")}
          className="w-full bg-blue-600 text-white p-2 rounded">
          Back to Topic Selection
        </button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
        <div className="mb-6">
          <p className="text-xl mb-2">Score: {quizResults.score.toFixed(1)}%</p>
          <p>
            Correct Answers: {quizResults.correct} out of {quizResults.total}
          </p>
        </div>
        <div className="space-y-4 mb-6">
          {questions.map((question, index) => {
            const result = quizResults.answers[question._id];
            return (
              <div
                key={question._id}
                className={`p-4 rounded ${
                  result?.correct ? "bg-green-100" : "bg-red-100"
                }`}>
                <p className="font-semibold mb-2">{question.question}</p>
                <p>Your answer: {answers[question._id]}</p>
                <p>Correct answer: {result?.correctAnswer}</p>
              </div>
            );
          })}
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/topics")}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Try Another Quiz
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-green-600 text-white px-4 py-2 rounded">
            View Leaderboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Question {currentQuestion + 1} of {questions.length}
      </h2>
      <div className="mb-6">
        <p className="text-lg mb-4">{questions[currentQuestion]?.question}</p>
        <div className="space-y-2">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                handleAnswer(questions[currentQuestion]._id, option)
              }
              className={`w-full p-2 text-left rounded ${
                answers[questions[currentQuestion]._id] === option
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="bg-gray-300 text-gray-700 p-2 rounded">
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            className="bg-blue-600 text-white p-2 rounded ml-auto">
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="bg-green-600 text-white p-2 rounded ml-auto disabled:bg-gray-400">
            Submit Quiz
          </button>
        )}
      </div>
      {currentQuestion === questions.length - 1 &&
        Object.keys(answers).length < questions.length && (
          <p className="text-red-500 mt-4">
            Please answer all questions before submitting.
          </p>
        )}
    </div>
  );
}

export default Quiz;
