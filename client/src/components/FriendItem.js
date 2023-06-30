import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useAuthContext } from "../hooks/useAuthContext";

const FriendItem = (props) => {
  const friendData = props.data;
  const { user } = useAuthContext();

  return (
    <div className="container">
      {friendData && (
        <div className="summoner-info">
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" +
              friendData.ProfileIconId +
              ".png"
            }
            alt="Users"
            height={200}
          />
          <table className="table table-hover table-dark">
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>Summoner Name</td>
                <td>{friendData.SummonerName}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>Level</td>
                <td>{friendData.SummonerLvl}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FriendItem;
