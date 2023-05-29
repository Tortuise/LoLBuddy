import React , {useState , useEffect} from 'react'
import axios from "axios";
import NavComponent from '../components/NavBar'

import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import { useAddUser } from '../hooks/useAddUser';

const Followers = () => {
    const { user } = useAuthContext()
    const [searchText, setSearchText] = useState("")
    const [searched, setSearched] = useState()
    const [added, setAdded] = useState()
    const [userData, setUserData] = useState({})
    const { addUser } = useAddUser()

    const onChange = (e) => {
        setSearched(null)
        setAdded(null)
        setSearchText({ ...searchText, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (user) {
          setSearched(null)
          setAdded(null)
        }
        
    }, [user]);

    function searchForUser(event) {
        setSearched(true)
        if (!user) {
            console.log('Not Authorized')
            return
        }
        const config = {
            headers:{
              'Authorization': `Bearer ${user.token}`
            },
            params: {username: searchText}
        };
        axios
            .get('http://localhost:8082/api/followers/', config)
            .then((res) => {
                setUserData(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }

    function addFollower(event) {
        addUser(userData.username)
        setAdded(true)
    }
    
    return (
           
        <div className='Search'>
        <div className='container'>
            <NavComponent fixed="top" />
            <h1> User Search</h1>
            <input type='text' onChange={onChange}></input>
            <button onClick={e => searchForUser(e)}> Search User </button>
        </div>
        {searched ? <>{JSON.stringify(userData) != '{}' ? 
        <>
        <h2>User found</h2>
        <img width='100' height='100' src ={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/" + userData.ProfileIconId +".png"}></img>
        <h2>Name: {userData.username}</h2>
        {added ? <><p>User added</p></> 
        : <><button onClick={e=>addFollower(e)}>Add as Follower</button></>}
        </> 
        : <><h1>No user found</h1></>
        }</>:<></>}
        
    </div>
        
    )
}

export default Followers;