// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import axios from "./axios";
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original";


function Row({ title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    //A sinppest of code which runs based on a specific condition/variable
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            //https://developers.google.com/youtube/player_parameters
            autoplay:1
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);               
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            {/* title*/}
            <h2>{title} </h2>
            {/* container -posters */}
            <div className="row_posters">
            
            {/* src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}  */}
{/* console.log(movie); */}
                {movies.map((movie) => {
                    
                    return <img
                        key={movie.id}
                        onClick={
                            ()=>handleClick(movie)
                        }
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        
                        src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />
                })}
            </div>           
            {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;