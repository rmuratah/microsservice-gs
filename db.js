const connection = require('./connection/connection')
const data = require('./data')

const {
  queryInsertMetas,
  queryInsertObjetivos,
  queryInsertIndicadores,
  queryInsertODS,
  deleteQuerys,
  createQuerys,
  queryGetObjetivos,
  queryGetIndicadores
} = require('./querys.js');

const dropTables = async () => await deleteQuerys.map(async query => await connection.query(query))
const createTable = async () => await createQuerys.map(async query => await connection.query(query))

//Insert DataSets
const insertMetas = async () => await data.getMetas().map(async row => await connection.query(queryInsertMetas, row))
const insertObjetivos = async () => await data.getObjetivos().map(async row => await connection.query(queryInsertObjetivos, row))
const insertIndicadores = async () => await data.getIndicadores().map(async row => await connection.query(queryInsertIndicadores, row))
const insertOds = async () => await data.getODS().map(async row => await connection.query(queryInsertODS, row))

const getObjetivos = async () => (await connection.query(queryGetObjetivos))[0];

const getIndicador = async (id) => (await connection.query(queryGetIndicadores, [id]))[0];

module.exports = {
  getObjetivos,
  getIndicador,
  createTable,
  dropTables,
  insertMetas,
  insertObjetivos,
  insertIndicadores,
  insertOds
};
