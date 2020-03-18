const {Client, Pool} = require('pg')
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    port:process.env.DB_PORT
})
async function getMovies(){
  query = 'select * from movies'
  const res = await pool.query(query)
  return res.rows;
}

  async function addMovie(res){
    query = `insert into movies( 
      rank,
      title,
      desription,
      run_time,
      genre,
      rating,
      meta_score,
      votes,
      gross_earning_in_mil,
      director_id,
      actor,
      year
      ) VALUES (${res.rank},'${res.title}','${res.description}',${res.runtime},
        '${res.genre}',${res.rating},'${res.metascore}',${res.votes},
        '${res.gross_earning_in_mil}',${res.director_id},'${res.actor}',${res.year})`;
    const result = await pool.query(query)
    return result;
  }

  async function getSingleMovie(directorId){
    query = `select * from movies where director_id = ${directorId}`
    const result = await pool.query(query)
    return result.rows;
  }

  async function updateMovie(director_id,title){
    query = `update movies set title = '${title.title}' where director_id = ${director_id}`
    const result = await pool.query(query)
    return result;
  }


  async function deleteMovie(director_id){
    query = `delete from movies where director_id = ${director_id}`
    const result = await pool.query(query)
    return result;
  }

module.exports = {
    getMovies,
    addMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie,
  }