import axios from 'axios';

const WALLET_ADDRESS = '';     //  Use personal Ethereum wallet address

const localAPI = axios.create({
    baseURL: 'http://localhost:3000/', // should be set based on env
});

//    Work in progress... doesn't yet display any data on UI
const getCollections = async () => {
    let data = [];
    const config = {
        method: 'GET',
        url: 'https://api.opensea.io/api/v1/collections',
        params: {
            asset_owner: WALLET_ADDRESS,
            offset: '0',
            limit: '300'
        }
    }
    const response = await axios.request(config).then(res => {
        return res.data;
    }).catch(e => console.log(e));

    console.log('Response:', response);
    response.foreach(item => {
        const formattedData = {
            name: item.name,
            image: item.image_url,
        };
        data.push(formattedData);
    });

    return data;
};

const getUsers = () => localAPI.get('/users');

export default {
    getUsers,
    getCollections
};
