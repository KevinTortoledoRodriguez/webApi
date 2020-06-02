const router = require("express").Router();

module.exports = (models) => {
    router.get('/playlist', async (req,res) => {
        let playlist = await models.playlist.findAll();
            res.send(playlist);
    })

    router.get('/playlists/:track', async (req,res) => {
        const TrackID = req.params.track
        const play = []
        let playlistTracks = await models.playlistTracks.findAll({
            where: { TrackId: TrackID}
        });
        playlistTracks.map(playt => {
            play.push(playt.dataValues.PlaylistId)
        })
        let playlist = await models.playlist.findAll({
            where: {PlaylistId: play}
        })
        res.send(playlist);
    })

    return router;
}
