const OS = require('../services/OpenSea');
const OSPresenter = require('../middlewares/OS/Presenter');

module.exports = {
  fetchCollection: async (req, res) => {
    console.log('Fetching collection...');
    const response = await OS.getCollection().then(res => {
      return OSPresenter.formatResponse(res);
    }).catch(e => console.log(e));

    res.json(response);
  }
};
