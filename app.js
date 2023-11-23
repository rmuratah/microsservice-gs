const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config()

const HOST = '0.0.0.0' //Uma forma do docker entender que ele só precisa repassar a porta 3000

app.use(express.json());

app.delete("/table", async (req, res) => { await db.dropTables(); res.sendStatus(204) })
app.post("/table", async (req, res) => { await db.createTable(); res.sendStatus(201) })
app.post("/metas", async (req, res) => { await db.insertMetas(); res.sendStatus(201) })
app.post("/objetivos", async (req, res) => { await db.insertObjetivos(); res.sendStatus(201) })
app.post("/indicadores", async (req, res) => { await db.insertIndicadores(); res.sendStatus(201) })
app.post("/ods", async (req, res) => { await db.insertOds(); res.sendStatus(201) })

app.get("/objetivos", async (req, res) => res.json(await db.getObjetivos()))

app.get("/indicador/:id", async (req, res) => res.json(await db.getIndicador(req.params.id)))

app.listen(process.env.PORT, HOST, () => console.log(`MICRSSERVICE-GS ${process.env.PORT}`))