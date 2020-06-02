const router = require("express").Router();

module.exports = (models) => {
    /*router.get('/albums', async (req,res) => {
        let albums = await models.album.findAll();
            res.send(albums);
    })*/
    
    router.get('/tracks?:artist', async (req,res) => {
        const artist = req.query.artist;
        console.log(artist)
        const albumsids = []; 

        let albums = await models.album.findAll({
            where: {ArtistID: artist}
        });

        albums.map(album =>{
            albumsids.push(album.dataValues.AlbumId)
        }); 

        let tracks = await models.track.findAll({
            where: {AlbumId: albumsids}
        });

        res.send(tracks);
    })

    return router;
}
