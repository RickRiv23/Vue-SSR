const axios = require('axios');

module.exports = {
  getCollection: async () => {
    const config = {
      method: 'GET',
      url: 'https://api.opensea.io/api/v1/collection/doodles-official'
    };

    const response = await axios.request(config).then(function (res) {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });

    return response;
  }
};
