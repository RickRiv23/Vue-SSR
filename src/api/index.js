import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // should be set based on env
});

//    Work in progress... doesn't yet display any data on UI
const getCollections = async () => {
    return api.get('/api/opensea').then(res => { return res.data }).catch(e => console.log(e));
};

const getUsers = () => api.get('/users');

const spotifyLogin = async () => await api.get('/api/spotify/login');

export default {
    getUsers,
    getCollections,
    spotifyLogin
};
