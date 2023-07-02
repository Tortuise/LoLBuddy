import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFriends } from "../hooks/useFriends";
import FriendItem from "../components/FriendItem";
import MatchCard from "../components/MatchCard";
import NavComponent from "../components/NavBar";

function ShowFriendDetails(props) {
  const {
    findMatches,
    findFriend,
    deleteFriend,
    isLoading,
    error,
    friendData,
    matchData,
    isLoadingMatch,
    errorMatch,
  } = useFriends();
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [displayMatch, setDisplayMatch] = useState(false);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        await findFriend(id);
      }
      fetchData();
    }
  }, [id, matchData]);

  const onDeleteClick = () => {
    deleteFriend(friendData._id);
  };

  const matchHistory = async () => {
    await findMatches(friendData.PUUID);
    setDisplayMatch(true);
  };

  const matchList =
    matchData.length === 0
      ? "no match history found"
      : matchData.map((match, k) => (
          <MatchCard
            match={{ match: match, profileName: friendData.SummonerName }}
            key={k}
          />
        ));

  function Winrate() {
    let wins = 0;
    for (let i = 0; i < matchData.length; i++) {
      for (let j = 0; j < matchData[i].info.participants.length; j++) {
        let player = matchData[i].info.participants[j];
        if (player.summonerName === friendData.SummonerName && player.win) {
          wins += 1;
        }
      }
    }

    return <h4>Winrate = {(wins / matchData.length) * 100}%</h4>;
  }

  return (
    <div className="page">
      <NavComponent fixed="top" />
        <div className="show-friend-detail">
          <div className="col-md-10 m-auto">
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Summoner's Info</h1>
            <p className="lead text-center">View Summoner's Info</p>
            <hr /> <br />
          </div>
          {isLoading != true ? (
            <div>
              <FriendItem data={friendData} />
            </div>
          ) : (
            <a>Loading Friend data</a>
          )}

          {displayMatch ? (
            <div className="col-md-6 m-auto">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setDisplayMatch(false);
                }}
              >
                Close
              </button>
              <div className="winrate"><Winrate /> </div>
              
              {matchList}
            </div>
          ) : (
            <div className="col-md-6 m-auto">
              <button
                type="button"
                className="btn btn-primary"
                disabled={isLoadingMatch || isLoading}
                onClick={() => {
                  matchHistory(friendData);
                }}
              >
                Match History
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onDeleteClick(friendData);
                }}
                disabled={isLoading}
              >
                Delete Friend
              </button>
            </div>
          )}
        </div>
    </div>
  );
}

export default ShowFriendDetails;
