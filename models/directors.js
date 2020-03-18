const {Client, Pool} = require('pg')
require('dotenv').config();
//console.log(process.env.DB_);
const pool = new Pool({
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    port:process.env.DB_PORT
})
async function getDirectors(){
  query = 'select * from directors'
  const res = await pool.query(query)
  return res.rows;
}

  async function addDirector(director){
    query = `insert into directors(director_id,director_name) values (${director.director_id},'${director.director_name}')`
    const result = await pool.query(query)
    return result;
  }

  async function getSingleDirector(directorId){
    query = `select director_name from directors where director_id = ${directorId}`
    const result = await pool.query(query)
    return result.rows;
  }

  async function updateDirector(director_id,director_name){
    query = `update directors set director_name = '${director_name}' where director_id = ${director_id}`
    const result = await pool.query(query)
    return result;
  }


  async function deleteDirector(director_id){
    query = `delete from directors where director_id = ${director_id}`
    const result = await pool.query(query)
    return result;
  }
  
  module.exports = {
    getDirectors,
    addDirector,
    getSingleDirector,
    updateDirector,
    deleteDirector,
  }