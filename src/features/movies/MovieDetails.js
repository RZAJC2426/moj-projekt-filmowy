import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = "https://api.themoviedb.org/3";
const key = process.env.REACT_APP_TMDB_API_KEY;

function MovieDetails(){
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`${API}/movie/${id}?api_key=${key}`)
        .then(res => setMovie(res.data))
        .catch(err => {
            console.error("Błąd ładowania filmu:", err);
        });
    }, [id]);

    if(!movie) return<p>Ładowanie...</p>;

    return (
        <motion.div
        className="movie-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <Link to="/">Powrót</Link>
        <h2>{movie.title}</h2>
        {movie.poster_path ?(
        <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
        />
        ) : (
            <div style={{width:300, height: 450, background:"#ccc"}}>
                Brak plakatu
            </div>
        )}
        <p>{movie.overview}</p>
        <p><strong> Premiera: </strong> {movie.release_date}</p>
        <p><strong> Ocena:</strong> {movie.vote_average}/10</p>   
        </motion.div>
    );
}

export default MovieDetails;
