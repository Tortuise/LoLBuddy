import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePosts } from '../hooks/usePosts';

const PostCard = (props) => {
  const postdata = props.post;
  const { user } = useAuthContext();
  const { getImage, getError, getIsLoading, data } = usePosts();
  
  useEffect(() => {
    if (postdata.Img) {
      getImage(postdata);
    }
  }, [user]);

  return (
    <div className='postcard-container'>
    { postdata != null ?
    <>
    {postdata.username && 
    <h3>
      <img 
        className='postcard_icon'
        src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + postdata.ProfileIconId +".png"}
        
      ></img>
      <Link to={`/profile/${postdata.userId}`}>{postdata.username} </Link>
      {(user.username === postdata.username) && <p>you</p>}
    </h3>
    }
    {(postdata.createdAt) && 
      <p style={{textAlign: 'right'}}>Posted at {postdata.createdAt.split('T')[0]}</p>
    }
    {postdata.Img && 
      <img
        src={data}
        alt='Post'
        height={200}
      ></img>
    }
    {postdata.Text && <p style={{padding: 5, }}> {postdata.Text}</p>}
    </>
    : <>
    <p>No Post data</p>
    </>
    }
    </div>
  );
};

export default PostCard;