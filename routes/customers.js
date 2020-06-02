const router = require("express").Router();

module.exports = (models) => {
    router.get('/customers', async (req,res) => {
        let customers = await models.customer.findAll();
            res.send(customers);
    })

    router.get('/customers/:id', async (req,res) => {
        const customer = req.params.id
        let customers = await models.customer.findAll({ 
            where : {CustomerId: customer}
        });
            res.send(customers);
    })

    router.post('/customers', async (req,res) => {
        let customer = req.body;
        await models.customer.create(customer);
        res.send({message:"Insersion ok!"})
    })

    router.get('/customers/employee?:id', async (req,res) => {
        const emp = req.query.id
        let customers = await models.customer.findAll({
            where: {
                SupportRepId: emp
            }
        })
        res.send(customers)
    })
    
    router.get('/customers/:id/genres', async (req,res) => {
        const custoid = req.params.id
        const invoicesids =[]
        const tracksids=[]
        const tracks = []
        
        let invoices = await models.invoice.findAll({
            where : { CustomerId: custoid }
        });
        invoices.map(invoice =>{
            invoicesids.push(invoice.dataValues.InvoiceId)
        })
        let invoiceItems = await models.invoiceItems.findAll({
            where : {InvoiceId : invoicesids}
        })
        invoiceItems.map(item => {
            tracksids.push(item.dataValues.TrackId)
        })
        let pists = await models.track.findAll({
            where: {TrackId: tracksids}
        })
        pists.map(pist =>{
            tracks.push(pist.dataValues.GenreId)
        })
        let genres = await models.genre.findAll({
            where: {genreId: tracks}
        })
        res.send(genres)
    })

    router.get('/customers/:id/tracks', async (req,res) => {
        const custoid = req.params.id
        const invoicesids =[]
        const tracksids=[]
        
        let invoices = await models.invoice.findAll({
            where : { CustomerId: custoid }
        });
        invoices.map(invoice =>{
            invoicesids.push(invoice.dataValues.InvoiceId)
        })
        let invoiceItems = await models.invoiceItems.findAll({
            where : {InvoiceId : invoicesids}
        })
        invoiceItems.map(item => {
            tracksids.push(item.dataValues.TrackId)
        })
        let pists = await models.track.findAll({
            where: {TrackId: tracksids}
        })
        res.send(pists)
    })
    return router;
}
