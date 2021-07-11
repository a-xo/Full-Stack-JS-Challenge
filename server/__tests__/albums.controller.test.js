import * as albumsController from '../controllers/albums.controller';
import { getMockReq, getMockRes } from '@jest-mock/express';


describe('Check controller function "getAlbumsController" ', () => {
  const { res, next } = getMockRes({
    data: {
      results: [],
    },
  });

  it('should respond with the correct requested entity from the service', async () => {
    const req = getMockReq({
      query: { artist: 'Nirvana' },
    });

    await albumsController.getAlbumsController(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        artistName: 'Nirvana'.toLowerCase(),
      })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        artistName: req.query.artist.toLowerCase(),
      })
    );
  });
});

describe('check getUniqueAlbums method of the getAbumsController function', () => {
  const albums = [
    {
      artistName: 'Nirvana',
      collectionName: 'Bleach (Deluxe Edition)',
    },
    {
      artistName: 'Nirvana',
      collectionName:
        'From the Muddy Banks of the Wishkah (Live)', // This name is duplicated
    },
    {
      artistName: 'Nirvana',
      collectionName:
        'From the Muddy Banks of the Wishkah (Live)', // This name is duplicated
    },
    {
      artistName: 'Nirvana',
      collectionName: 'In Utero',
    },
  ];

  it('should return only albums with unique names, no duplicates', () => {
    const uniqueAlbums =
      albumsController.getUniqueAlbums(albums);

    expect(uniqueAlbums.length).toBe(3);
    expect(uniqueAlbums[0].collectionName).toEqual(
      'Bleach (Deluxe Edition)'
    );
    expect(uniqueAlbums[1].collectionName).toEqual(
      'From the Muddy Banks of the Wishkah (Live)'
    );
    expect(uniqueAlbums[2].collectionName).toEqual(
      'In Utero'
    );
    expect(uniqueAlbums[0].collectionName).not.toEqual(
      uniqueAlbums[1].collectionName
    );
    expect(uniqueAlbums[0].collectionName).not.toEqual(
      uniqueAlbums[2].collectionName
    );
    expect(uniqueAlbums[3]).toBeUndefined();
  });

  it('should return empty array if albums not found', () => {
    const uniqueAlbums = albumsController.getUniqueAlbums(
      []
    );
    expect(uniqueAlbums).toEqual([]);
  });

  it('should return an empty array if null is passed', () => {
    const uniqueAlbums =
      albumsController.getUniqueAlbums(null);
    expect(uniqueAlbums).toEqual([]);
  });
});
