import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './design.css';
import { Button } from "react-bootstrap";


/**
* Searches for a movie in imDb database, buttons return movie ratings and actors. Allows to add movies to a watchlist.
* @param {string} moviename Name of movie 
* @returns {object} { id: MovieID
*                     Title : movieTitle
*                     image: link for poster
*                      }
* @returns {object} { image: Link for actor picture 
*                     Actor-name : actors name
*                     actorCharacter: Character played as in movie
*                      }  
*
* @param {string} _id specific id for movie in mongoDB

* @returns {object} { status: successfully deleted from watchlist/failed to delete } 
*   
* @returns {object} { imDb: rating
*                     metacritic: rating 
*                     rottenTomatoes: rating
*                      } 
*
*/
function WatchList() {
    let [data, setData] = useState(null);
    let [watchList, setWatchList] = useState(null);
    let [info, setInfo] = useState(null);
    let [movie, setMovie] = useState(null);
    let [rating, setRating] = useState(null);
    let [Rmovie, setRmovie] = useState(null);
    const [error, setError] = useState(null);
    /* Retrieves watchlist from mongoDB */
    let WatchList = () => {
        axios.get(`http://localhost:5678/GetwatchList`).then((response) => {//sends to backend
            setData(response.data);
        }).catch(function (error) {
            // handle error   
            setError("Error")
        })
    }

    /*  Sends movie id to mongoDB and deletes it */

    if (watchList != null) {
        axios.delete('http://localhost:5678/deletewatchList/' + watchList, {}).then(function (response) {
            // handle success         
            console.log("Movie deleted from watchlist");
            setError(false);
            alert("Successfully removed!")
            console.log(watchList);
            setWatchList(null);
            WatchList();
        }).catch(function (error) {
            // handle error    
            alert("Already removed!");
            setError("Unexpected Error");
        })
    }

    /* Sends request to retriece actors of a specific movie */
    if (movie != null) {
        axios.get('http://localhost:5678/movieInfo/' + movie, {}).then(function (response) {
            // handle success
            console.log("move info success");
            setError(false);
            setInfo(response.data.actors)
            console.log(response.data.actors);
        }).catch(function (error) {
            // handle error    
            setError("Unexpected Error")
        })
        setMovie(null);
    }
    /*  Sends request backend and gets movie ratings from three different sources   */
    if (Rmovie != null && info == null) {
        console.log(Rmovie);
        axios.get('http://localhost:5678/MovieRating/' + Rmovie, {}).then(function (response) {
            // handle success
            console.log("move rating success");
            setError(false);
            setRating(response.data)
            console.log(response.data);
        }).catch(function (error) {
            // handle error    
            setError("Unexpected Error")
        })
        setRmovie(null);
    }
    useEffect(() => {
        WatchList()
    }, [])

    /*  Maps out data retrieved from mongoDB. Puts each movie into their own tile.
    *   It is supposed to do the same with the actors and rating but it is updating every tile instead of the single one.
    */
    return (
        <div >
            {data && data.length > 0 && <>
                {data.map((movie, key) => {
                    return (
                        <div key={movie.id} className="container">
                            <div className="row">
                                <div className="movies">
                                    <li>
                                        <h2>{movie.title}</h2>
                                        <h2>{movie.rank}</h2>
                                        <img src={movie.image} alt="Poster"></img>
                                        <Button onClick={() => {
                                            setMovie(movie.id);
                                        }}>{"Movie info. . ."}
                                        </Button>

                                        <Button onClick={() => {
                                            setInfo(null);
                                        }}>{"Remove info. . ."}
                                        </Button>
                                        <Button onClick={() => {
                                            setRmovie(movie.id);
                                        }}>{"Ratings"}
                                        </Button>
                                        <Button onClick={() => {
                                            setRating(null);
                                        }}>{"Remove Ratings"}
                                        </Button>
                                        <Button onClick={() => {
                                            setWatchList(movie._id);
                                        }}>{"Remove from watchlist"}
                                        </Button>
                                        {info && info.length > 0 && <>
                                            <table className="table">
                                                <thead>
                                                    <tr >
                                                        <td>Actor picture</td>
                                                        <td>Actor</td>
                                                        <td>Character</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {info.map(actors => {
                                                        return (
                                                            <tr key={info.id} >
                                                                <td>
                                                                    <img id="actorimg" src={actors.image} alt="Actor"></img>
                                                                </td>
                                                                <td >{actors.name}</td>
                                                                <td >{actors.asCharacter}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </>}
                                        {rating && <>
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Imdb rating</td>
                                                        <td>metacritic rating</td>
                                                        <td>Rotten Tomatoes</td>
                                                    </tr>

                                                    <tr  >
                                                        <td >{rating.imDb}</td>
                                                        <td>{rating.metacritic}</td>
                                                        <td>{rating.rottenTomatoes}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>}
                                    </li>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>}
        </div>
    )
}
export default WatchList;