import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "../config/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfile } from "../hooks/useProfile";
import { useUser } from "../hooks/useUserFriends";
import NavComponent from "../components/NavBar";

const SearchPlayer = (props) => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { getAccUser, accUser } = useProfile();
  const { getUserFriendsData, userFriendsData } = useUser();

  useEffect(() => {
    if (user) {
      async function fetchData() {
        await getAccUser();
        await getUserFriendsData(user.username);
      }
      fetchData();
    }
  }, [user]);

  const onChange = (e) => {
    setSearchText({ ...searchText, [e.target.name]: e.target.value });
  };

  function searchForPlayer(event) {
    if (!user) {
      console.log("Not Authorized");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: { username: searchText },
    };
    Axios
      .get("/users/name", config)
      .then((res) => {
        setPlayerData(res.data);
      })
      .catch((err) => {
        console.log(err + searchText);
      });
  }

  function setProfileData(event) {
    if (!user) {
      console.log("Not Authorized");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const data = {
      PUUID: playerData.puuid,
      SummonerName: playerData.name,
      SummonerLvl: playerData.summonerLevel,
      ProfileIconId: playerData.profileIconId,
    };

    Axios
      .put(`/users/${user.username}`, data, config)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addFriend(event) {
    setError(false);
    if (!user) {
      console.log("Not Authorized");
      return;
    }
    // check if already added friend
    for (let i = 0; i < userFriendsData.length; i++) {
        if (userFriendsData[i].SummonerName === playerData.name) {
            setError("Friend already added");
            return;
        }
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: { username: user.username },
    };
    const data = {
      PUUID: playerData.puuid,
      SummonerName: playerData.name,
      SummonerLvl: playerData.summonerLevel,
      ProfileIconId: playerData.profileIconId,
    };
    Axios
      .post(`/friends/`, data, config)
      .then((res) => {
        setError(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  }

  return (
    <div className="page">
      <NavComponent fixed="top" />
      <div className="container">
        <div className="search-player">
          <h1> League of Legends Search</h1>
          <input type="text" onChange={onChange}></input>
          <button
            className="btn btn-primary"
            onClick={(e) => searchForPlayer(e)}
          >
            {" "}
            Search{" "}
          </button>
          <div className="col-md-11">
            <Link to="/" className="btn btn-outline-primary float-right">
              Back to user list
            </Link>
          </div>

          {JSON.stringify(playerData) != "{}" ? (
            <>
              <h2>Player data found</h2>
              <hr></hr>
              <img
                width="100"
                height="100"
                src={
                  "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" +
                  playerData.profileIconId +
                  ".png"
                }
              ></img>
              <h2>Name: {playerData.name}</h2>
              <h2>Level: {playerData.summonerLevel}</h2>
              <hr></hr>
              <button
                className="btn btn-primary"
                onClick={(e) => setProfileData(e)}
              >
                {" "}
                Set as profile
              </button>
              <button className="btn btn-success" onClick={(e) => addFriend(e)}>
                Add as Friend
              </button>
              {error && <div className="error">{error}</div>}
            </>
          ) : (
            <>
              <h1>No player found</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchPlayer;
