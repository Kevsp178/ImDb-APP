import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './design.css';
import { Button } from "react-bootstrap";
import { Container } from 'react-bootstrap';


const Page = () => {
    return (
        <div id="page">
        <table className="table">
            <tbody>

                <tr >
                    <td id="page1">
                        <div>Project by Jarold Sabillon.</div>
                        <div>IMDB API powered webapp</div>
                        <div>This webapp allows you to Search
                            imDb's database of movies. You can add movies to a watchlist
                            and view the actors, and the ratings from three different sources.
                        <a></a>
                        </div>

                        
                    </td>
                   
                </tr>

            </tbody>
        </table>
        </div>
    );
}

export default Page;
