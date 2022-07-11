import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './design.css';
import { Button } from "react-bootstrap";

/**
* Returns top 250 movies in imDb database, buttons return movie ratings and actors. Can add movies to a watchlist.
* @returns {object} { id: MovieID
*                     Title : movieTitle
*                     image: link for poster
*                      } 
*
* @param {string} Title title of movie
* @param {string} id ID of movie
* @param {string} image link for poster
* @returns {object} { status: successfully added to watchlist/failed to add } 
*   
* @returns {object} { imDb: rating
*                     metacritic: rating 
*                     rottenTomatoes: rating
*                      } 
*
*/
function ImdbTop250() {
    let [data, setData] = useState(null);
    let [watchList, setWatchList] = useState(null);
    let [image, setImage] = useState(null);
    let [title, setTitle] = useState(null);
    let [info, setInfo] = useState(null);
    let [movieInfo, setMovieInfo] = useState(null);
    let [rating, setRating] = useState(null);
    let [Rmovie, setRmovie] = useState(null);
    const [error, setError] = useState(null);

    /* Sends request to backend to retrieve top 250 movies */
    let ImdbTop250 = () => {
        axios.get('http://localhost:5678/GetTop250', {}).then(function (response) {
            // handle success
            console.log("top 250 success");
            setError(false);
            setData(response.data.items)
            console.log(response.data.items);


        }).catch(function (error) {
            // handle error    
            setError("Error")

        })
    }
    /*  Sends movie information to mongoDB and stores it */
    if (watchList != null) {
        axios.post('http://localhost:5678/postwatchlist',
            {
                id: watchList,
                image: image,
                title: title
            }).then(function (response) {
                // handle success         
                console.log("sent to watchlist success");
                setError(false);
                alert("Successfully added!")
                console.log(watchList);

                setWatchList(null);

            }).catch(function (error) {
                // handle error    

                alert("Already in watchlist!")
                setError("Unexpected Error")
            })
    }
    /*  Sends request backend and gets movie ratings from three different sources    */
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
        ImdbTop250()
    }, [])

    /*  Maps out data retrieved from backend. Puts each movie into their own tile.
    *   It is supposed to do the same with the actors and rating but it is updating every tile instead of the single one.
    */
    return (
        <div >
            {data && data.length > 0 && <>
                {data.map((movie, key) => {
                    return (
                        <div key={key} className="container">
                            <div className="row">
                                <div className="movies">
                                    <li>
                                        <h2>{movie.title}</h2>
                                        <h2>{movie.rank}</h2>
                                        <img src={movie.image} alt="Poster"></img>

                                
                                        <Button onClick={() => {
                                            setRmovie(movie.id);
                                        }}>{"Ratings"}
                                        </Button>
                                        <Button onClick={() => {
                                            setRating(null);
                                        }}>{"Remove Ratings"}
                                        </Button>
                                        <Button onClick={() => {
                                            setWatchList(movie.id);
                                            setImage(movie.image);
                                            setTitle(movie.title);
                                        }}>{"Add To watchlist"}
                                        </Button>
                                        {rating && <>
                                            <table className="table">
                                                <tbody>
                                                    <tr >
                                                        <td>Imdb rating</td>
                                                        <td>metacritic rating</td>
                                                        <td>Rotten Tomatoes</td>
                                                    </tr>
                                                    <tr>
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
export default ImdbTop250;