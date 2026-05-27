const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service');
const albumModel = require('../models/album.model.');


async function addMusic(req, res){
const {title} = req.body;

const file = req.file;

const result = await uploadFile(file.buffer.toString('base64'));

const music = await musicModel.create({
  uri: result.url,
  title,
  artist: req.user.id
});

res.status(201).json({
  message: 'Music created successfully',
  music: {
    id: music._id,
    title: music.title,
    uri: music.uri,
    artist: music.artist
  }

});

} 

async function createAlbum(req, res) {
    const { title, musicIds } = req.body;

    const album = await albumModel.create({
      title,
      musics: musicIds,
      artist: req.user.id
    });

    res.status(201).json({
      message: 'Album created successfully',
      album: {
        id: album._id,
        title: album.title,
        musics: album.musics,
        artist: album.artist
      }
    });

}

async function getAllMusics(req, res) {
  const musics = await musicModel
  .find()
  .skip(2)//skip this many then limit.
  .limit(1)
  .populate('artist', 'username');

  res.status(200).json({
   message: 'Musics retrieved successfully',
   musics: musics
})
}

async function getAllAlbums(req, res) {
  const albums = await albumModel.find().select("title artist ").populate('artist', 'username').populate('musics');
  res.status(200).json({
    message: 'Albums retrieved successfully',
    albums: albums
  });
}

async function getAlbumById(req, res) {
  const  albumId = req.params;

  const album = await albumModel.findById(albumId).populate('artist', 'username').populate('musics');

  return res.status(200).json({
    message: 'Album retrieved successfully',
    album: album
  });
}

async function logoutUser(req, res) {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Logout successful'
  });
}

module.exports = { addMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById, logoutUser };
