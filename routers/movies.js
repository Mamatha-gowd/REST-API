const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('/home/mamatha/movies-api/models/movies.js')
const schemas = require('../validation/Mvalidation.js')
const app = express()

router.use(bodyParser.json())
app.get('/',(request,response)=>{
  response.send("");
});


router.get('/api/movies',(request,response)=>{
  const res = db.getMovies();
  res.then(res=> response.status(200).send(res))
  .catch(e=>{
    response.status(404).send({
      data:{ error: 'can not retrieve the data' }
    })
  })
})


router.get('/api/movies/:directorId', async(request,response,next)=>{
  try {
    await schemas.validateMovie({director_id:request.params.directorId});
    const result = db.getSingleMovie(request.params.directorId);
    result.then((result)=> {
      response.status(200).send(result)
      console.log(result)
    }).catch((err)=>{
      response.status(404).send('can not get the data')
    });
  } catch (error) {
    next(error);
   // console.log(error.message)
    //response.status(400).send(error.message);
  }
});


router.post('/api/movies', async (request,response,next)=>{
  try {
    await schemas.validatepostMovie({
      rank: request.body.rank,
      title: request.body.title,
      description: request.body.description,
      director_id: request.body.director_id, 
     })
  const res = db.addMovie(request.body);
  res.then(res=> response.status(200).send(res))
  .catch(e=>{
    response.status(404).send({
      data:{ error: 'can not add the data' }
    })
  })
}
catch (error) {
  next(error);
}
})



router.put('/api/movies/:directorId', async (request,response,next)=>{
  try {
    await schemas.validateputMovie({
      title: request.body.title,
     director_id: request.params.directorId, 
     })
  const res = db.updateMovie(request.params.directorId,request.body);
  res.then(res=> response.status(200).send(res))
  .catch(e=>{
    response.status(404).send({
      data:{ error: 'can not update the data' }
    })
  })
}
catch (error) {
  next(error);
  //response.status(400).send(error.message);
}
})


router.delete('/api/movies/:directorId', async (request,response,next)=>{
  try {
    await schemas.validateMovie({
      director_id: request.params.director_id, 
     })
  const res = db.deleteMovie(request.params.directorId);
  res.then(res=> response.status(200).send(res))
  .catch(e=>{
    response.status(404).send({
      data:{ error: 'can not delete the data' }
    })
  })
}
catch (error) {
  next(error)
  // response.status(400).send(error.message);
}
})


module.exports =router