import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePosts } from '../hooks/usePosts';

const PostCard = (props) => {
  const postdata = props.post;
  const { user } = useAuthContext();
  const { getImage, addLike, getError, getIsLoading, data } = usePosts();
  const [state, setState] = useState();
  const [likes, setLikes] = useState(postdata.Likes.length);
  
  useEffect(() => {
    if (postdata.Img) {
      getImage(postdata);
    }
  }, [user]);

  const onClick = async (e) => {
    const res = await addLike(postdata._id);
    setState(res);
    setLikes(postdata.Likes.length);
  }

  function Item() {
    if (user.username === postdata.username) {
      return <Link to={`/profile/${postdata.userId}`}>You</Link>

    }
    return <Link to={`/profile/${postdata.userId}`}>{postdata.username} </Link>
  }

  return (
    <div className='postcard-container'>
    { postdata != null ?
    <>
    <div>
      {postdata.username && 
      <h3 className='postcard-username'>
        <img 
          className='postcard_icon'
          src={"https://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + postdata.ProfileIconId +".png"}
        ></img>
        <Item/>
      </h3>
    }
    </div>
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
    <button onClick={onClick}>👍</button> {(postdata.Likes) && <p>{likes}</p>}
    {state && <p>{state.msg}</p>}
    </>
    : <>
    <p>No Post data</p>
    </>
    }
    </div>
  );
};

export default PostCard;