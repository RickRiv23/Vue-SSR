const axios = require('axios');

module.exports = {
  fetchLogin: () => {
    const CLIENT_ID = "439743d6abdd4dc59afe80c1886e73d6",
        REDIRECT_URI = "http://localhost:8000",
        AUTH_END_POINT = "https://accounts.spotify.com/authorize",
        RESPONSE_TYPE = "token";

    return `${AUTH_END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  }
};
