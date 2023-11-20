const connection = require('./connection/connection')
const data = require('./data')

async function dropTable() {
  const query = `DROP TABLE IF EXISTS ods`
  connection.query(query)
}

async function createTable() {
  const query = `
    CREATE TABLE ods (
      id INT AUTO_INCREMENT PRIMARY KEY,
      codigo VARCHAR(100),
      regiao VARCHAR(100),
      taxa DOUBLE,
      ano INT
    )
  `
  connection.query(query)
}

async function insertDatasets() {
  const query = "INSERT INTO ods (codigo, regiao, taxa, ano) VALUES (?, ?, ?, ?)"
  data.getData().map(row => connection.query(query, row))
}

async function getObjeivos() {
  const query = "SELECT * FROM objetivos;";
  const objetivos = await connection.query(query);
  return objetivos[0];
}

async function getIndicador(id) {
  const query = "SELECT * FROM indicador WHERE id=?;";
  const indicador = await connection.query(query, [id]);
  return indicador[0];
}

module.exports = {
  getObjeivos,
  getIndicador,
  createTable,
  dropTable,
  insertDatasets
};
