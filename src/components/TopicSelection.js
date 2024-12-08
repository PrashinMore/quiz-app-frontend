import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TopicSelection() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  const topics = [
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "Literature"
  ];

  const handleStartQuiz = () => {
    console.log("Selected topics:", selectedTopics);
    navigate("/quiz", {
      state: { selectedTopics }
    });
  };

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Select Topics</h2>
      <div className="space-y-2">
        {topics.map((topic) => (
          <label key={topic} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedTopics.includes(topic)}
              onChange={() => toggleTopic(topic)}
              className="form-checkbox"
            />
            <span>{topic}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleStartQuiz}
        disabled={selectedTopics.length === 0}
        className="mt-6 w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-300">
        Start Quiz
      </button>
    </div>
  );
}

export default TopicSelection;
