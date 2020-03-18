const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('/home/mamatha/movies-api/models/directors.js')
const app = express()
const schemas = require('/home/mamatha/movies-api/validation/Dvalidation.js')



router.use(bodyParser.json())
app.get('/',(request,response)=>{
  response.send("");
});


router.get('/api/directors',(request,response)=>{
  const res = db.getDirectors();
  res.then(res=> response.status(200).send(res))
  .catch(e=>{
    response.status(404).send({
      data:{ error: 'can not retrieve the data' }
    })
  })
})


router.get('/api/directors/:directorId', async(request,response,next)=>{
  try {
    await schemas.validateDirector({director_id:request.params.directorId});
    const result = db.getSingleDirector(request.params.directorId);
    result.then((result)=> {
      response.status(200).send(result)
      console.log(result)
    }).catch((err)=>{
      response.status(404).send('can not get the data')
    });
  } catch (error) {
    next(error);
    //response.status(400).send(error.message);
  }
});



router.post('/api/directors', async (request,response,next)=>{
  try {
    await schemas.validateDirector({director_id: request.body.director_id})
  const res = db.addDirector(request.body);
  res.then(res=> response.status(200).send(res))
  .catch(e=>{
    response.status(404).send({
      data:{ error: 'can not add the data' }
    })
  })
}
catch (error) {
 next(error)
  //response.status(400).send(error.message);
}
})



router.put('/api/directors/:directorId', async(request,response,next)=>{
  try {
    await schemas.validateputDirector({director_id:request.params.directorId,
      director_name: request.body.director_name});
    const result = db.updateDirector(request.params.directorId,request.body.director_name);
    result.then((result)=> {
      response.status(200).send(result)
      console.log(result)
    }).catch((err)=>{
      response.status(404).send('can not update the data')
    });
  } catch (error) {
    next(error);
  }
});


router.delete('/api/directors/:directorId', async(request,response,next)=>{
  try {
    await schemas.validateDirector({director_id:request.params.directorId});
    const result = db.deleteDirector(request.params.directorId);
    result.then((result)=> {
      response.status(200).send(result)
      console.log(result)
    }).catch((err)=>{
      response.status(404).send('can not delete the data')
    });
  } catch (error) {
    //console.error(error.message);
    //response.status(400).send(error.message);
    next(error);
  }
});

module.exports =router