import React , {useState , useEffect} from 'react'
import axios from "axios";
import NavComponent from '../components/NavBar'
import UserCard from '../components/UserCard'
import PostCard from '../components/PostCard'

import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAddUser } from '../hooks/useAddUser';
import { useFollowers } from '../hooks/useFollowers';
import { usePosts } from '../hooks/usePosts';

const Timeline = () => {
    const { user } = useAuthContext()
    const {getUserFollowers, userFollowers} = useFollowers()
    const {getFollowersPosts, followersPosts} = useFollowers()
    const {getUserData, userData} = useProfile()
    const { createPost } = usePosts()
    const [postText, setPostText] = useState("")

    useEffect(() => {
        if (user) {
          async function fetchData() {

            await getUserFollowers(user.username)
          
            await getUserData(user.username)
            
            await getFollowersPosts(user.username)
          }
          fetchData();

        }
        
    }, [user]);

  const onChange = (e) => {
      setPostText({ ...postText, [e.target.name]: e.target.value });
  };

    const postSubmit = async (e) => {
      const postdata = {
        Text: postText,
        Img: String,
        username: user.username,
        userId: userData._id
      };
      await createPost(postdata)

    };

    const posts =
    followersPosts.length === 0
      ? 'there is no posts record!'
      : followersPosts.map((post, k) => <PostCard post={post} key={k} />);


    return (  
        <div className='Followers'>
            <div className='container'>
                <NavComponent fixed="top" />
                <h1> Timeline</h1>
                <input type='text post' onChange={onChange}></input>
                <button onClick={e => postSubmit(e)}> Post </button>
            </div>
            {posts}
        </div>       
        )
}
export default Timeline;