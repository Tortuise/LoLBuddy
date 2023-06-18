import React , {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import Axios from "../config/axios";

export const useFriends = () => {
    const {user} = useAuthContext()
    const [state, setState] = useState({
            error:'',
            isLoading: false,
            data:{},
        });
    const [friendData, setFriend] = useState();
    const [matchs, setMatchs] = useState({
        errorMatch:'',
        isLoadingMatch: false,
        matchData:[],
    });
    let testList = [];

    // get match data of past 5 games
    const findMatches = async (puuid) =>  {
        setMatchs(prev => ({
            ...prev,
            isLoadingMatch: true,
        }));
        if (user) {
            const config = {
              headers:{
                'Authorization': `Bearer ${user.token}`
              },
              params: {puuid: puuid}
            };
            await Axios.get(`friends/lolmatches`, config)
            .then((res) => {
                setMatchs(prev => ({
                    ...prev,
                    isLoadingMatch: false,
                    matchData:res.data,
                }));
            })
            .catch((err) => {
                console.log(err);
                setMatchs(prev => ({
                    ...prev,
                    isLoadingMatch: false,
                    errorMatch:err,
                }));
            });
        };

    }

    // find data from friend id
    const findFriend = async (id) =>  {
        setState(prev => ({
            ...prev,
            isLoading: true,
        }));
        if (user) {
            const config = {
              headers:{
                'Authorization': `Bearer ${user.token}`
              },
              params: {username: user.username}
            };
        
            await Axios.get(`friends/${id}`, config)
            .then((res) => {
                setFriend(res.data);
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                }));
            })
            .catch((err) => {
                console.log('Error from ShowFriendDetails');
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error:err,
                }));
            });
        }
    }

    // delete friend by id
    const deleteFriend = async (id) => {
        if (user) { 
            const config = {
                headers:{
                  'Authorization': `Bearer ${user.token}`
                },
                params: {username: user.username}
            };
            Axios.delete(`http://localhost:8082/api/friends/${id}`, config)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.log('Error from ShowFriendDetails_deleteClick');
            });
        }
    }
    return {findMatches, findFriend, deleteFriend, ...state, friendData, ...matchs}
}