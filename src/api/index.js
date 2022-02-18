import axios from 'axios';

const localAPI = axios.create({
    baseURL: 'http://localhost:8000/', // should be set based on env
});

//    Work in progress... doesn't yet display any data on UI
const getCollections = async () => {
    return localAPI.get('/api/opensea').then(res => { return res.data }).catch(e => console.log(e));
};

const getUsers = () => localAPI.get('/users');

export default {
    getUsers,
    getCollections
};
