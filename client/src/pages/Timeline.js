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
    const {getFollowersPosts, isLoading: followersLoading, error: followersError, data: followersData} = useFollowers()
    const {getUserData, userData} = useProfile()
    const { createPost, uploadPost, addLike, isLoading, error: postError, url } = usePosts()
    const [postText, setPostText] = useState({
      text: '',
      img:'',
    })
    const [image, setImage] = useState({ 
      preview: '',
      data:'',
  })
    const [error, setError] = useState('')
    const validTypes = ['image/jpg', 'image/png', 'image/jpeg']

    useEffect(() => {
        if (user) {
          async function fetchData() {
          
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
      if (!validTypes.find(type => type === file.type)) {
        setError("File must be in JPG/PNG format")
        return
      };
      
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      }
      setImage(img);
      const form = new FormData();
      form.append('image', img.data);
      await uploadPost(form);
    }

    const posts =
    followersData.length === 0
      ? 'there is no posts record!'
      : followersData.map((post, k) => <PostCard post={post} key={k} />);


    return (  
        <div className='Followers'>
            <div className='container'>
                <NavComponent fixed="top" />
                <h1> Timeline</h1>
                <label>Post text:</label>
                <br></br>
                <input type='text post' onChange={onChange} name='text' value={postText.text}></input>
                <br></br>
                <label>Select Image with Post (optional):</label>
                <input type="file"
                  id="image" name="image"
                  accept="image/png, image/jpeg"
                  onChange={handleUpload}
                  >
                
                </input>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                {error && <div className='error'>{error}</div>}
                <br></br>
                <button onClick={e => postSubmit(e)}> Post </button>
            </div>
            {followersError && <div className='error'>{followersError}</div>}
            {followersLoading && <p>Loading...</p>}
            {posts}
        </div>       
        )
}
export default Timeline;