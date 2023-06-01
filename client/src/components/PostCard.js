import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';

const PostCard = (props) => {
  const postdata = props.post;
  const { user } = useAuthContext()

  return (
    <div className='postcard-container'>
    { postdata != null ?
    <>
    <h4>Posted at {postdata.createdAt.split('T')[0]}</h4>
    {postdata.username && 
    <Link to={`/profile/${userdata._id}`}>{userdata.username}</Link>
    }
    {postdata.Img && 
    <img
        src= {postdata.Img}
        alt='Icon'
        height={200}
    />
    }
    {postdata.Text && <p> {postdata.Text}</p>}
    </>
    : <>
    <p>No Post data</p>
    </>
    }
    </div>
  );
};

export default PostCard;