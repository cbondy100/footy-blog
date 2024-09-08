import React, {useEffect, useState} from "react";
import axios from 'axios';

const EPLStanding = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings';

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get(proxyUrl + apiUrl, {
                    headers: {
                        'X-Auth-Token': 'f3cb18d84c56453cb980ad357017cc46'
                    }
                });
                setStandings(response.data.standings[0].table);
                setLoading(false);
            } catch(error){
                setError(error)
                setLoading(false);
            }
        }
        fetchStandings();
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h2>Premier League Standings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team) => (
                        <tr key={team.team.id}>
                            <td>{team.position}</td>
                            <td>{team.team.name}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default EPLStanding;