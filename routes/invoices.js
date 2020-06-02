const router = require("express").Router();

module.exports = (models) => {
    
    router.get('/invoices/:idCustomer', async (req,res) => {

        const custoId = req.params.idCustomer

        let billings = await models.invoice.findAll({
            where: { CustomerId : custoId}
        })

        res.send(billings)
    })
    
    router.post('/invoices/', async (req,res) => {
        let invoice = req.body;
        await models.invoice.create(invoice);
        res.send({message:"Insersion ok!"})
    })

    router.get("/invoices?:invoiceId", async (req,res)=>{
        console.log(req.query.invoiceId)
        const invoiceId = req.query.invoiceId;
        let invoice = await models.invoiceItems.findAll({
            where: {
                InvoiceId: invoiceId
            }
        });
    res.send(invoice);
    });

    return router;
}
