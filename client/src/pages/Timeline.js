import React, { useState, useEffect } from "react";
import NavComponent from "../components/NavBar";
import PostCard from "../components/PostCard";

import { useProfile } from "../hooks/useProfile";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFollowers } from "../hooks/useFollowers";
import { usePosts } from "../hooks/usePosts";

const Timeline = () => {
  const { user } = useAuthContext();
  const {
    getFollowersPosts,
    isLoading: followersLoading,
    error: followersError,
    data: followersData,
  } = useFollowers();
  const { getUserData, userData } = useProfile();
  const {
    createPost,
    uploadPost,
    addLike,
    isLoading,
    error: postError,
    url,
  } = usePosts();
  const [postText, setPostText] = useState({
    text: "",
    img: "",
  });
  const [image, setImage] = useState({
    preview: "",
    data: "",
  });
  const [error, setError] = useState("");
  const validTypes = ["image/jpg", "image/png", "image/jpeg"];
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        await getUserData(user.username);

        await getFollowersPosts(user.username);
      }
      fetchData();
    }
  }, [user, posted, followersData]);

  const onChange = (e) => {
    setPostText({ ...postText, [e.target.name]: e.target.value });
  };

  const postSubmit = async (e) => {
    const postdata = {
      Text: postText.text,
      username: user.username,
      userId: userData._id,
      ProfileIconId: userData.ProfileIconId,
      Img: url,
    };
    await createPost(postdata);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!validTypes.find((type) => type === file.type)) {
      setError("File must be in JPG/PNG format");
      return;
    }

    const img = {
      preview: URL.createObjectURL(file),
      data: file,
    };
    setImage(img);
    const form = new FormData();
    form.append("image", img.data);
    await uploadPost(form);
    setPosted(true);
    setPosted(false);
  };

  const posts =
    followersData.length === 0
      ? "there is no posts record!"
      : followersData.map((post, k) => <PostCard post={post} key={k} />);

  return (
    <div className="page">
      <NavComponent fixed="top" />
      <div className="container">
        <div className="timeline">
          <h1> Timeline</h1>
          <hr></hr>
          <h3>
            <label>Post text:</label>
          </h3>
          <div className="timeline-post">
            <img
              className="postcard_icon"
              src={
                "https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" +
                userData.ProfileIconId +
                ".png"
              }
            ></img>
            <input
              type="text post"
              placeholder="Send a message"
              onChange={onChange}
              name="text"
              value={postText.text}
            ></input>
          </div>

          <br></br>
          <label>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4131/4131814.png"
              height={50}
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleUpload}
          ></input>
          {image.preview && (
            <img src={image.preview} width="100" height="100" />
          )}
          {error && <div className="error">{error}</div>}
          <button className="btn btn-primary" onClick={(e) => postSubmit(e)}>
            {" "}
            Post{" "}
          </button>
          <hr></hr>
          {followersError && <div className="error">{followersError}</div>}
          {posts}
        </div>
      </div>
    </div>
  );
};
export default Timeline;
