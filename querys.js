const queryInsertMetas = "INSERT INTO metas (id) VALUES (?)"
const queryInsertObjetivos = "INSERT INTO objetivos (global, brasil, metas_id) VALUES (?, ?, ?)"
const queryInsertIndicadores = "INSERT INTO indicadores (id, descricao, metas_id) VALUES (?, ?, ?)"
const queryInsertODS = "INSERT INTO ods (codigo, regiao, taxa, ano) VALUES (?, ?, ?, ?)"
const deleteQuerys = [`DROP TABLE IF EXISTS ods`, `DROP TABLE IF EXISTS indicadores`, `DROP TABLE IF EXISTS objetivos`, `DROP TABLE IF EXISTS metas`]
const createQuerys = [`
    CREATE TABLE metas (
      id CHAR(10) NOT NULL PRIMARY KEY
    )
  `, `
    CREATE TABLE objetivos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      global VARCHAR(400),
      brasil VARCHAR(400),
      metas_id CHAR(10),
      FOREIGN KEY (metas_id) REFERENCES metas(id)
    )
  `, `
    CREATE TABLE indicadores (
      id CHAR(10) PRIMARY KEY,
      descricao VARCHAR(200),
      metas_id CHAR(10),
      FOREIGN KEY (metas_id) REFERENCES metas(id)
    )
  `, `
    CREATE TABLE ods (
      id INT AUTO_INCREMENT PRIMARY KEY,
      codigo CHAR(10),
      regiao VARCHAR(100),
      taxa DOUBLE,
      ano INT,
      FOREIGN KEY (codigo) REFERENCES indicadores(id)
    )
  `]
const queryGetObjetivos = `
    SELECT
        m.id AS id,
        JSON_OBJECT(
            'brasil', MAX(o.brasil),
            'global', MAX(o.global)
        ) AS objetivo,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', i.id,
                'descricao', i.descricao
            )
        ) AS indicadores
    FROM metas m
    LEFT JOIN objetivos o ON m.id = o.metas_id
    LEFT JOIN indicadores i ON m.id = i.metas_id
    GROUP BY m.id
  `

const queryGetIndicadores = "SELECT regiao, taxa, ano FROM gs.ods where codigo = ?"

module.exports = {
  queryInsertMetas,
  queryInsertObjetivos,
  queryInsertIndicadores,
  queryInsertODS,
  deleteQuerys,
  createQuerys,
  queryGetObjetivos,
  queryGetIndicadores
};