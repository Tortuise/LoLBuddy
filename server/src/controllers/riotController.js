const axios = require('axios');

// call RIOT API get player data
const searchForPlayer = async (name) =>  {
	let server = process.env.RIOT_API_SERVER;
	let APICallString = "https://"+server+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+process.env.REACT_APP_RIOT_API
	return axios.get(APICallString).then(res => {
    	return res.data

  	}).catch(function (error){
    	console.log(error)

	});
}

// get five recent matches id from puuid then get matchdata
const get5Match = async (req, res) =>  {
	const puuid = req.query.puuid;
	let server = process.env.RIOT_API_MATCH_SERVER;
	let APICallString = "https://"+server+".api.riotgames.com/lol/match/v5/matches/by-puuid/"+puuid+"/ids?start=0&count=5&api_key="+process.env.REACT_APP_RIOT_API
	
	const gameIds = await axios.get(APICallString).then(res => res.data
	).catch(function (error){
    	console.log(error.response)
	});
	const matchesData = [];
	for (let i = 0; i < gameIds.length; i++) {
		const matchId = gameIds[i];
		const matchData = await axios.get("https://"+server+".api.riotgames.com/lol/match/v5/matches/"+matchId+"?api_key="+process.env.REACT_APP_RIOT_API)
			.then(res => res.data)
			.catch(err => err)
		matchesData.push(matchData);
	}
	res.json(matchesData)
}
module.exports = {searchForPlayer, get5Match}