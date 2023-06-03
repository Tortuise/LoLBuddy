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
    {postdata.createdAt && 
      <h4>Posted at {postdata.createdAt.split('T')[0]}</h4>
    }
    {postdata.username && 
    <Link to={`/profile/${postdata.userId}`}>{postdata.username}</Link>
    }
    {postdata.Img && 
    <img
        src= {postdata.Img}
        alt='Post'
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