Jarold Sabillon - An ImDb based web app.

This web app allows for the user to search for a movie, view actors and ratings, and add the movie to a watchlist as well as remove them. 

It uses react for the front end.

To start use command while in the directory  **(Requires Node and NPM)
React/frontend:
              /imbd-app/src ---> npm start
              
              
Node/Backend: 
              /Backend--> Node movieserver.js
              
 Requires  (npm install/npm install dotenv ) --> mongodb, express, body-parser, nodeJS, react-bootstrap, react-router-dom, axios, node-fetch, swagger-ui-express, swagger-jsdoc

MongoDB server -> localhost:27017

Creates Server - > movieserver -Creates Collections -> movieList - Creates records -> Movies in watchlist

Find page at http://localhost:3000/ http://localhost:3000/Home http://localhost:3000/GetTop250 http://localhost:3000/GetwatchList http://localhost:3000/SearchMovie

For function documentation: http://127.0.0.1:5678/out/index.html For express route documentation: http://127.0.0.1:5678/docs/#/

7 Request points- 4 api calls, 3 database calls.

Get: 
  /GetTop250   - gets top 250 movies API
  response:  
            {
      "title": "Inception",
      "rank": "1",
      "image": "Link"
    }
  
  /MovieRating/{movie}   -  Movie rating for API
  response: 
                  {
        "imDb": "7.8",
        "metacritic": "7.8",
        "rottenTomatoes": "7.8"
      }
          
  /SearchMovie/{movie}   - Searches movies API
  response: 
             {
      "title": "Inception",
      "id": "tt6272956",
      "image": "Link"
    }
            
  /MovieInfo/{movie}     - Gets actors in movie API
  response: 
            {
      "name": "Leonardo Dicaprio",
      "character": "Cobb",
      "image": "Link"
    }
            
  /GetwatchList          - Retrieves movies in watchlist from databse mongoDB
    response:
            {
      "title": "Inception",
      "id": "tt6272956",
      "image": "Link"
    }
  
Post:
  /postwatchList         - Adds movie to watchlist
    Takes information from mapped out movie data.
    params:
              {
                id:   ####,
                title:  "string",
                image:   "Link"
              }
    response: 
              {
      "status": "Successfully added/Already in watchlist"
    }
  
Delete: 
  /deletewatchList        - Deletes movies from watchlist
    uses special ID of movie created when posted.
    response: 
              {
      "Status": "Successful/Failed"
    }
