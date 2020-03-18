const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = process.env.PORT;
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

app.use(morgan('dev',{
  skip: function (request,response) { 
    return response.statusCode < 400
  }
}))

app.use(morgan('common',{
  stream: fs.createWriteStream(path.join(__dirname, 'logfile'),{flags: 'a'})
}))

app.use(express.json());

app.get('/',(request,response)=>{
  response.send("Movies-api")
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

app.use('/',require('/home/mamatha/movies-api/routers/directors.js'))
app.use('/',require('/home/mamatha/movies-api/routers/movies.js'))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({extended: true,})
)
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})
module.exports =app