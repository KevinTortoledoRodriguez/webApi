const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./database.js")
const employeesRouter = require("./routes/employees")(db);
const customersRouter = require("./routes/customers")(db);
const playlistsRouter = require("./routes/playlists")(db);
const albumsRouter = require("./routes/albums")(db);
const invoicesRouter = require("./routes/invoices")(db);
const tracksRouter = require("./routes/tracks")(db);


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const port = process.env.PORT || 3000

//app.use(express.json())

app.use("/api", employeesRouter)
app.use("/api", customersRouter)
app.use("/api", playlistsRouter)
app.use("/api", albumsRouter)
app.use("/api", invoicesRouter)
app.use("/api", tracksRouter)
//app.use("/api", router)

app.all("/", (req,res) => {
    console.log(res.route)
    res.json({
        status:"ok"
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})