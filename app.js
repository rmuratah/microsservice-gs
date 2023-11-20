const express = require("express");
const app = express();
const db = require("./db");
app.use(express.json());

app.delete("/table", async (req, res) => {
  await db.dropTable()
  res.sendStatus(204)
})

app.post("/table", async (req, res) => {
  await db.createTable()
  await db.insertDatasets()
  res.sendStatus(201)
})

app.get("/objetivos", async (req, res) => {
  await res.json(db.getObjeivos);
})

app.get("/indicador/:id", async (req, res) => {
  //const id = parseInt(req.params.id);
  //await res.json(db.getIndicador(id));
});

app.listen(3001, () => console.log("App esta funcionando"))