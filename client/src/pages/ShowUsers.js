import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import FriendCard from "../components/FriendCard";
import UserCard from "../components/UserCard";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfile } from "../hooks/useProfile";
import { useUser } from "../hooks/useUserFriends";
import NavComponent from "../components/NavBar";

function ShowUsers() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { getUserData, userData } = useProfile();
  const {
    getUserFriendsData,
    userFriendsData,
    getUserFollowers,
    userFollowers,
    getUserFollowing,
    userFollowing,
  } = useUser();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getUserData(user.username);
      getUserFriendsData(user.username);
      getUserFollowers(user.username);
      getUserFollowing(user.username);
    }
  }, [user]);

  const friends =
    userFriendsData.length === 0
      ? <p>There is no friend record</p>
      : userFriendsData.map((friend, k) => (
          <FriendCard user={friend} key={k} />
        ));

  const following =
    userFollowing.length === 0
      ? <p>No one following</p>
      : userFollowing.map((following, k) => <UserCard user={following} key={k} />);

  const followers =
    userFollowers.length === 0
      ? <p>No one you follow</p>
      : userFollowers.map((follower, k) => <UserCard user={follower} key={k} />);

  return (
    <div className="show-users">
      <NavComponent user={user} fixed="top" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h1>Your Profile</h1>
          </div>

          <div className="col-md-11">
            {!user && (
              <Link to="/login" className="btn btn-outline-warning float-right">
                Login
              </Link>
            )}

            {user && (
              <div>
                <Link
                  to="/search-player"
                  className="btn btn-outline-info float-right"
                >
                  Search Player
                </Link>
              </div>
            )}
            <br />
            <br />
            <div>
              {(userData && userData.PUUID) ? <UserCard user={userData} />: 
              <><Link to={`/profile/${userData._id}`}>{userData.username}</Link>
              <p>No League of Legends Profile Set</p>
              <Link to={`/search-player`}>Find your Summoner Profile</Link></>}
              
            </div>
            <h3>LoL Friends</h3>
            <hr />
          </div>
        </div>
        {user && <div className="list">{friends}</div>}
        <h3>Users you follow</h3>
        <hr />
        {userData.followers ? (
          <div className="list">{followers}</div>
        ) : (
          <>You are not following anyone</>
        )}
        <h3>Users following you</h3>
        <hr />
        {userData.following ? (
          <div className="list">{following}</div>
        ) : (
          <>No followers found</>
        )}
      </div>
    </div>
  );
}

export default ShowUsers;
