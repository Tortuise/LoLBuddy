import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useAuthContext } from "../hooks/useAuthContext";

const FriendCard = (props) => {
  const friend = props.user;
  const { user } = useAuthContext();

  return (
    <div className="card-container">
      {friend ? (
        <>
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" +
              friend.ProfileIconId +
              ".png"
            }
            alt="Icon"
            height={200}
          />
          <div className="desc">
            <h2>
              <Link to={`/show-friend/${friend._id}`}>
                {friend.SummonerName}
              </Link>
            </h2>
            <h3>{friend.SummonerLvl}</h3>
          </div>
        </>
      ) : (
        <>
          <p>No leagueoflegends Profile Set</p>
        </>
      )}
    </div>
  );
};

export default FriendCard;
