import React from "react";
import "../styles/TrophyPopup.css"

const TrophyPopup = ({isOpen, onClose, content}) => {
    if (!isOpen) return null;

    const {competition, yearData} = content;

    console.log(competition)

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>X</button>
                
                <h2>{competition.name} - {yearData.year}</h2>
                {competition.name === "League Title" ? (
                    <div>
                        <p>Total Points: {yearData.total_points}</p>
                        <p>Wins: {yearData.wins}, Losses: {yearData.losses}, Draws: {yearData.ties}</p>
                        <p>Runner-Up: {yearData.runner_up}</p>
                    </div>
                ) : (
                    <div>
                        <p>Scoreline: {yearData.scoreline}</p>
                        <p>Opponent: {yearData.opponent}</p>
                        <p>Goalscorers: {yearData.goalscorers.join(", ")}</p>
                        <p>{yearData.location}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrophyPopup;