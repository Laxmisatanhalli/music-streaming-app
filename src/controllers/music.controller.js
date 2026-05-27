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
  const musics = await musicModel.find().populate('artist', 'username');

  res.status(200).json({
   message: 'Musics retrieved successfully',
   musics: musics
})
}

module.exports = { addMusic, createAlbum, getAllMusics };


  