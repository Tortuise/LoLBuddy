import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Axios from "../config/axios";

export const useProfile = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [accUser, setAccUser] = useState("");

  const getAccUser = async () => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: user.username },
      };

      Axios.get("/users", config)
        .then((res) => {
          setAccUser(res.data);
        })
        .catch((err) => {
          console.log("Error from getUserData");
        });
    }
  };

  const getUserData = async (username) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { username: username },
      };

      Axios.get("/users", config)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log("Error from getUserData");
        });
    }
  };
  const getUserDataById = async (id) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      Axios.get(`/users/${id}`, config)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getPostsFromUser = async (id) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      Axios.get(`/posts/${id}`, config)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log("Error from getUserData");
        });
    }
  };

  const setMain = async (champ) => {
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = {
        champ: champ,
        id: userData._id,
      };

      try {
        await Axios.post("/users/main", data, config);
      } catch (e) {
        console.log(e);
      }
    }
  };
  
  return {
    getUserData,
    getUserDataById,
    getPostsFromUser,
    setMain,
	getAccUser,
    userData,
    posts,
	accUser,
  };
};
