import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "../config/axios";

export const useFollowers = () => {
  const { user } = useAuthContext();
  const [userFollowers, setUserFollowers] = useState([]);
  const [followersPosts, setFollowersPosts] = useState({
    error: "",
    isLoading: false,
    data: [],
  });

  const getUserFollowers = async (username) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: username },
      };

      Axios.get("/followers/showAll", config)
        .then((res) => {
          setUserFollowers(res.data);
        })
        .catch((err) => {
          console.log("Error from getFollowerData");
        });
    }
  };

  // for all followers put all posts in list and sort by date created
  const getFollowersPosts = async (event) => {
    setFollowersPosts((prev) => ({
      ...prev,
      isLoading: true,
    }));

    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: user.username },
      };
      const posts = [];
      try {
        const response = await Axios.get(`/posts/all/`, config);

        setFollowersPosts({ isLoading: false, error: "", data: response.data });
      } catch (e) {
        setFollowersPosts({
          isLoading: false,
          error: "error getting follower posts",
        });
        console.log(e);
      }
    }
  };

  const addUser = async (searchText) => {
    const follower = searchText;
    if (!user) {
      console.log("Not Authorized");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: { username: user.username },
    };
    const data = {
      username: follower,
    };
    Axios.post(`/followers/add`, data, config).catch((err) => {
      console.log(err);
    });
  };

  const unfollow = async (username) => {
    if (!user) {
      console.log("Not Authorized");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: { username: user.username },
    };
    const data = {
      username: username,
    };
    Axios.post(`/followers/unfollow`, data, config).catch((err) => {
      console.log(err);
    });
  };

  return {
    getUserFollowers,
    getFollowersPosts,
    userFollowers,
    ...followersPosts,
    addUser,
    unfollow,
  };
};
