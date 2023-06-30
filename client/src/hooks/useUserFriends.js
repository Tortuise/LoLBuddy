import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "../config/axios";

export const useUser = () => {
  const { user } = useAuthContext();
  const [userFriendsData, setUserFriendsData] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);

  const getUserFriendsData = async (username) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: username },
      };

      Axios.get("/friends", config)
        .then((res) => {
          setUserFriendsData(res.data);
        })
        .catch((err) => {
          console.log("Error from getUserFriendData");
        });
    }
  };

  const getUserFollowers = async (username) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: username },
      };

      Axios.get("/followers/followers", config)
        .then((res) => {
          setUserFollowers(res.data);
        })
        .catch((err) => {
          console.log("Error from getUserFollowers");
        });
    }
  };

  const getUserFollowing = async (username) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: username },
      };

      Axios.get("/followers/following", config)
        .then((res) => {
          setUserFollowing(res.data);
        })
        .catch((err) => {
          console.log("Error from getUserFollowing");
        });
    }
  };
  return {
    getUserFriendsData,
    userFriendsData,
    getUserFollowers,
    userFollowers,
    getUserFollowing,
    userFollowing,
  };
};
