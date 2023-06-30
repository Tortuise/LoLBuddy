import React, { useState, useEffect } from "react";
import axios from "axios";
import NavComponent from "../components/NavBar";
import UserCard from "../components/UserCard";

import { useProfile } from "../hooks/useProfile";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFollowers } from "../hooks/useFollowers";

const Followers = () => {
  const { user } = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState();
  const [added, setAdded] = useState();
  const { getUserData, userData, getAccUser, accUser } = useProfile();
  const { getUserFollowers, userFollowers , addUser} = useFollowers();

  const onChange = (e) => {
    setSearched(null);
    setAdded(null);
    setSearchText({ ...searchText, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setSearched(null);
      setAdded(null);
      getUserFollowers(user.username);
      getAccUser();
    }
  }, [user]);

  function searchForUser(event) {
    setSearched(true);
    getUserData(searchText);
  }

  function addFollower(event) {
    addUser(userData.username);
    setAdded(true);
  }

  const followers =
    userFollowers.length === 0
      ? <p>No one you are currently following</p>
      : userFollowers.map((follower, k) => (
          <UserCard user={follower} key={k} />
        ));

  return (
    <div className="page">
      <NavComponent fixed="top" />
      <div className="container">
        <div className="user-search">
          <h1> User Search</h1>
          <input type="text" onChange={onChange}></input>
          <button className="btn btn-primary" onClick={(e) => searchForUser(e)}>
            {" "}
            Search User{" "}
          </button>
          {searched ? (
            <>
              {userData != null ? (
                <>
                  <h2>User found</h2>
                  <hr></hr>
                  <img
                    width="100"
                    height="100"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" +
                      userData.ProfileIconId +
                      ".png"
                    }
                  ></img>
                  <h2>Name: {userData.username}</h2>
                  {added ? (
                    <>
                      <p>User added</p>
                    </>
                  ) : (
                    <>
                      {(accUser && accUser.followers.includes(userData._id)) ? <><p>Already following</p></> : <button
                        className="btn btn-success"
                        onClick={(e) => addFollower(e)}
                      >
                        Add as Follower
                      </button>}
                    </>
                  )}
                </>
              ) : (
                <>
                  <h1>No user found</h1>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          <div>
            <div className="FollowerList">
                <div className="center">
                <h2>Users you follow</h2>
                </div>
                <hr></hr>
                <div className="list">{followers}</div>
                <div className="center">
                <h2>Users that follow you</h2>
                </div>
                <hr></hr>
                {userData.following ? (
                <div className="list">{followers}</div>
                ) : (
                <p>No followers</p>
                )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Followers;
