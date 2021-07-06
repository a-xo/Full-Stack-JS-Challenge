const { getAlbumsService } = require('../services/album.service');

const getAlbumsController = async (req, res, next) => {

  const queryParams = req.query;

  try {
    const response = await getAlbumsService(queryParams);
    const APIResponse = response.data.results;
    console.log(APIResponse);
    res.status(200).json(APIResponse);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

const getAlbumsSingleName = (albums) => {
  return [...new Set(albums.map((album) => album.collectionName))];
};

const filterDublicates = (albums) => {
  return [...new Set(albums.map((album) => album.collectionName))];
};

module.exports = {
  getAlbumsController,
};
