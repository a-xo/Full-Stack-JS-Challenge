const axios = require("axios");

const getAlbumsService = async (queryParams) => {
  try {
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");
    const URL = `https://itunes.apple.com/search?${queryString}`;
    return await axios.get(URL);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getAlbumsService,
};


