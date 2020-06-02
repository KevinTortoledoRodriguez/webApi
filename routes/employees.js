const router = require("express").Router();


module.exports = (models) => {

    router.get('/employees', async (req,res) => {
        let employees = await models.employee.findAll({
            atributes: ["FirstName", "Lastname","Title","ReportsTo"]   
        });
        res.send(employees);
    })

    router.post('/employees', async (req,res) => {
        let employee = req.body;
        await models.employee.create(employee);
        res.send({message:"Insersion ok!"})
    })

    router.put('/employees/:id', async (req,res) => {
        let employee = req.body;
        let id = req.params.id;
        const update = await models.employee.findOne({ where: {EmployeeId : id}})
        .then (record => {
            if(!record) {
                throw new Error('No record found')
            }
            record.update(employee).then( updatedRecord => {
                console.log("actualizado")
                res.send({message: "Update ok!!"})
            })
        })
    })

    router.get('/employees/:id', async (req,res) => {
        const id = req.params.id
        let employee = await models.employee.findOne({
            atributes: ["FirstName", "Lastname","Title","ReportsTo"],
            where : { EmployeeId: id}   
        })
        res.send(employee)
    })

    return router;
}

