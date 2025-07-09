import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

const API ="https://api.themoviedb.org/3";
const key = process.env.REACT_APP_TMDB_API_KEY;

function GenrePage() {
    const {genreId} = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {
        axios
            .get(`${API}/discover/movie?api_key=${key}&with_genres=${genreId}&language=pl-PL`)
            .then((res) => setMovies(res.data.results))
            .catch((err) => console.error ("Błąd pobierania filmów wg. gatunku", err))
        }, [genreId]);

        axios
        .get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`)
        .then((res) => {
            const genre = res.data.genres.find(g => g.id === parseInt((genreId)));
            setGenreName(genre ? genre.name : "Nieznany gatunek");
        });
        
        return (
            <div
            className="page-container">
            <h2>Gatunek: {genreName}</h2>
            <ul className="movie-grid">
                {movies.map((movie) => (
                    <li key={movie.id} className="movie-item">
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                            <p>{movie.title}</p>
                    </li>
                ))}
            </ul>
            </div>
        );
};

export default GenrePage;




