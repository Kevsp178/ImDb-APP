//studentserver.js
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require('express');
const mongodb = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://127.0.0.1:27017/";
const dbConn = mongodb.MongoClient.connect(uri);

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ImDb API',
    version: '1.0.0',
    description:
      'Retrieves top 250 movies, search results, movie ratings, and actors. Can add movies to a watchlist.',

    contact: {
      name: 'Jarold Sabillon',

    },
  },
  servers: [
    {
      url: 'http://localhost:5678',
      description: 'Movie Server',
    },
  ],
};                                                           //setting up swagger express documentation 
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['MovieServer.js'],
};






app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /GetTop250:
 *   get:
 *     summary:  top250 API
 *     description: Retrieves top 250 movies with api, title, rank and poster.
 * 
 *      
 *     responses:
 *       200:
 *         description: movie information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The movie title.
 *                         example: Inception
 *                       
 *                       rank:
 *                         type: string
 *                         description: Movies ranking.
 *                         example: 1
 * 
 *                       image:
 *                         type: string
 *                         description: Link to image of poster.
 *                         example: Link                       
 *                    
 * 
 *                       
 */
app.get('/GetTop250', function (req, res) {
  console.log("Got top250 movies")

  const url = 'https://imdb-api.com/en/API/Top250Movies/'+ process.env.API_KEY;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(items => {
      return res.status(200).send(items)
    })
  console.log("Sending movie data")
});

/**
 * @swagger
 * /MovieRating/{movie}:
 *   get:
 *     summary:  Movie rating API
 *     description: Retrieves rating of movie. 
 *     parameters:
 *       - in: path
 *         id: movieid
 *         required: true
 *         description: Specific movie id
 *         schema:
 *           type: string 
 *      
 *     responses:
 *       200:
 *         description: movie information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imDb:
 *                   type: string
 *                   description: Rating.
 *                   example: 7.8
 *                       
 *                 metacritic:
 *                   type: string
 *                   description: Rating.
 *                   example: 7.8
 * 
 *                 rottenTomatoes:
 *                   type: string
 *                   description: Rating.
 *                   example: 7.8   
 * 
 *                       
 */
app.get('/MovieRating/:movie', function (req, res) {
  console.log("Getting Movie Ratings")
  
  const filter = req.params.movie;
  console.log(filter);

  const url = 'https://imdb-api.com/en/API/Ratings/'+process.env.API_KEY+'/'+ filter;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      return res.status(200).send(data)
    })
  console.log("Sending movie ratings")
});


/**
 * @swagger
 * /SearchMovie/{movie}:
 *   get:
 *     summary:  search movies API
 *     description: Retrieves movie searched for. 
 *     parameters:
 *       - in: path
 *         name: movie
 *         required: true
 *         description: Movies name
 *         schema:
 *           type: string 
 *      
 *     responses:
 *       200:
 *         description: movie information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The movie title.
 *                         example: Inception
 *                       
 *                       id:
 *                         type: string
 *                         description: Movies ID.
 *                         example: tt6272956
 * 
 *                       image:
 *                         type: string
 *                         description: Link to image of poster.
 *                         example: Link    
 * 
 *                       
 */
app.get('/SearchMovie/:movie', function (req, res) {
  console.log("Searching Movie")
  
  const filter = req.params.movie;
  console.log(filter);

  const url = 'https://imdb-api.com/en/API/SearchMovie/'+process.env.API_KEY+'/'+ filter;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      return res.status(200).send(data)
    })
  console.log("Sending movie data")
});


/**
 * @swagger
 * /MovieInfo/{movie}:
 *   get:
 *     summary:  Gets actors API
 *     description: Retrieves actors in movie searched for. 
 *     parameters:
 *       - in: path
 *         id: movie
 *         required: true
 *         description: Movies id
 *         schema:
 *           type: string 
 *      
 *     responses:
 *       200:
 *         description: movie information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of actor
 *                         example: Leonardo Dicaprio
 *                       
 *                       character:
 *                         type: string
 *                         description: Character played as.
 *                         example: Cobb
 * 
 *                       image:
 *                         type: string
 *                         description: Link to image of actor.
 *                         example: Link    
 * 
 *                       
 */
app.get('/MovieInfo/:movie', function (req, res) {
  console.log("Getting Movie info")
  
  const filter = req.params.movie;
  console.log(filter);

  const url = 'https://imdb-api.com/en/API/FullCast/'+process.env.API_KEY+'/'+ filter;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      return res.status(200).send(data)
    })
  console.log("Sending movie data")
});

/**
 * @swagger
 * /postwatchList:
 *   post:
 *     summary: Adds to watchlist
 *     description: Adds a movie to watchlist, id, title, and poster image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               first_name:          # <!--- taken from mapped out data
 *                 type: string
 *               last_name:    # <!--- taken from mapped out data
 *                 type: string
 *               image:    # <!--- taken from mapped out data
 *                 type: string
 *             
 * 
 *      
 *     responses:
 *       200:
 *         description: Status alert.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         description: status update.
 *                         example: Successfully added/Already in watchlist
 * 
 *                       
 */
app.post('/postwatchlist', function (req, res) {
  console.log("adding to watchlist");

  var record_id = new Date().getTime();
  var obj = {};
  obj._id = record_id;
  obj.id = req.body.id;
  obj.image = req.body.image;
  obj.title = req.body.title;
  const filter = {
    id: obj.id
  };
  console.log(filter)

  MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
    let rsp_obj = {};
    if (err) throw err;
    var dbo = client.db("movieserver");
    dbo.collection("movieList").find(filter).toArray(function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        dbConn.then(function (db) {
          db.db('movieserver').collection('movieList').insertOne(obj);
          console.log("Movie added to list")
        });
        client.close();
        return res.status(200).send(rsp_obj);
      }
      else {
        console.log("duplicate found")
        client.close();
        return res.status(400).send(err);
      }
    });
  });
});
/**
 * @swagger
 * /deletewatchList:
 *   delete:
 *     summary: Deletes movie from watchlist
 *     description: Removes a movie from watchlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               movie_id:          # <!--- taken from mapped out data
 *                 type: string
 *     responses:
 *       200:
 *         description: Status update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Status:
 *                         type: string
 *                         description: Status update.
 *                         example: Successful/Failed
 * 
 */

app.delete('/deletewatchList/:_id', function (req, res) {
  var obj = {};
  obj._id = parseInt(req.params._id);
  const filter = {
    _id: obj._id
  };
  console.log(filter);
  console.log("delete function")
  MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    var dbo = client.db("movieserver");
    dbo.collection("movieList").deleteOne(filter, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 4));
      if (result.deletedCount == 0) {
        console.log("Not found in watchlist")
        return res.status(400).send(err);
      }
      else{
        console.log("Succesfully removed from watchlist.")
      }
      client.close();
      return res.status(200).send(result);
    });
  });
});

/**
 * @swagger
 * /GetwatchList:
 *   get:
 *     summary: Watchlist
 *     description: Gets all movies from watchlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               movie_id:          # <!--- taken from mapped out data
 *                 type: string
 *     responses:
 *       200:
 *         description: Status update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The movie title.
 *                         example: Inception
 *                       
 *                       id:
 *                         type: string
 *                         description: Movies ID.
 *                         example: tt6272956
 * 
 *                       image:
 *                         type: string
 *                         description: Link to image of poster.
 *                         example: Link  
 * 
 */

app.get('/GetwatchList', function (req, res) {
  console.log("getting watchlist");

  MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    var dbo = client.db("movieserver");
    dbo.collection("movieList").find().toArray(function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 4));
      client.close();
      return res.status(200).send(result);
    });

  });
});

app.listen(5678); //start the server
console.log('Server is running...');