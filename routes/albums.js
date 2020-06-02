const router = require("express").Router();

module.exports = (models) => {
    /*router.get('/albums', async (req,res) => {
        let albums = await models.album.findAll();
            res.send(albums);
    })*/
    
    router.get('/albums?:artistId', async (req,res) => {
        const artistId = req.query.artistId
        let albums = await models.album.findAll({
            where: { ArtistId: artistId}
        })
        res.send(albums)
    })

    return router;
}
