const { getAlbumsService } = require('../services/album.service');
const _ = require('lodash');

const getAlbumsController = async (req, res, next) => {
  const artist = req.query.artist.toLowerCase();
  const queryParams = {
    term: artist,
    entity: 'album',
    limit: 200
  };
  try {
    const response = await getAlbumsService(queryParams);
    const artistAlbums = _.filter(response.data.results, (a) => {
      return a.artistName.toLowerCase() === artist;
    });
    const uniqueAlbums = getUniqueAlbums(artistAlbums);
    const APIResponse = {
      artistName: artist,
      count: response.data.results.length,
      uniqueAlbumCount: uniqueAlbums.length,
      albumNames: _.map(uniqueAlbums, 'collectionName'),
      uniqueAlbums
    };
    // console.log(APIResponse);
    res.status(200).json(APIResponse);
  } 
  catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

const getUniqueAlbums = (albums) => {
  return _.orderBy(
    _.uniqBy(albums, (a) => {
      return a.collectionName.toLowerCase();
    }),
    'collectionName'
  );
};

module.exports = {
  getAlbumsController, 
  getUniqueAlbums
};
