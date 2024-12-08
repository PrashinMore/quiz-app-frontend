import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/leaderboard`
        );
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="space-y-2">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded">
            <span>
              {index + 1}. {score._id}
            </span>
            <span className="font-bold">{score.totalScore} points</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
