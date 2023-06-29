import React, { useState, useEffect } from 'react';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFriends } from '../hooks/useFriends';
import MatchCard from '../components/MatchCard';

function MatchesComponent(props) {
    const data = props.data;
    const {findMatches, matchData, isLoadingMatch, errorMatch} = useFriends();
    const { user } = useAuthContext();
    const [displayMatch, setDisplayMatch] = useState(false);

    const matchHistory = async () => {
        await findMatches(data.PUUID);
        setDisplayMatch(true);
    }

    const matchList =
    matchData.length === 0
      ? 'no match history found'
      : matchData.map((match, k) => <MatchCard match={{match: match,profileName:data.SummonerName}} key={k} />);

    function Winrate() {
        let wins = 0;
        for (let i=0;i<matchData.length;i++) {
            for (let j=0;j<matchData[i].info.participants.length;j++) {
                let player = matchData[i].info.participants[j];
                if (player.summonerName === data.SummonerName && player.win) {
                wins += 1;
                }
            }
        }
        return <a>winrate = {wins/matchData.length * 100}%</a>
    }

    return (
        <div className='match-component'>
            {displayMatch 
                ? 
                <div className='col-md-6 m-auto'>
                    <Winrate/>
                    <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                        setDisplayMatch(false);
                    }}
                    >
                    Close
                    </button>
                    
                    {matchList}
                </div>

                : 
                <div className='col-md-6 m-auto'>
                    <button
                    type='button'
                    className='btn btn-primary'
                    disabled={isLoadingMatch}
                    onClick={() => {
                        matchHistory();
                    }}
                    >
                    Match History
                    </button>
                </div>
            }
        </div>
    );
}

export default MatchesComponent;
