import React, {useState} from "react";
import trophyData from '../data/trophies2.json'
import '../styles/TrophyCabinet.css'
import TrophyPopup from "./TrophyPopup";


const TrophyCabinet = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [selectedTrophy, setSelectedTrophy] = useState(null)

    const trophiesList = [
       trophyData.league_titles,
       trophyData.champs_league,
       trophyData.fa_cup,
       trophyData.league_cup,
       trophyData.europa_league,
       trophyData.cup_winners,
       trophyData.intercontinental,
       trophyData.super_cup,
       trophyData.club_world_cup 
    ]

    const handleClick = (competition, yearData) => {
        setIsPopupOpen(true);
        setSelectedTrophy({competition, yearData})
    }

    const closePopup = () => {
        setIsPopupOpen(false)
        setSelectedTrophy(null)
    }

    return (
        <div className="trophy-cabinet">
            <div className="trophy-content">
                <div className="years-list">
                    {trophiesList.map((competition) => (
                        competition.years.map((yearData,index) =>(
                            <div key={index} className="year-item" onClick={() => handleClick(competition, yearData)}>
                                <img src={competition.imgSrc} className="trophy-image"/>
                                <p>{yearData.year}</p>
                            </div>
                        ))
                    ))}
                </div>

            </div>
            {selectedTrophy && (
                <TrophyPopup isOpen={isPopupOpen} onClose={closePopup} content={selectedTrophy}/>
            )}
        </div>
    )
    
}

export default TrophyCabinet;