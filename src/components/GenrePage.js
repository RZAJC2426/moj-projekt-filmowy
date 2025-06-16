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

    useEffect(() => {
        axios
            .get(`${API}/discover/movie?api_key=${key}&with_genres=${genreId}&language=pl-PL`)
            .then((res) => setMovies(res.data.results))
            .catch((err) => console.error ("Błąd pobierania filmów wg. gatunku", err))
        }, [genreId]);
        
        return (
            <motion.div
            className="genre_page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit = {{ opacity: 0 }}
            >
            <h2>Filmy wg. gatunku</h2>
            <ul className="movie-grid">
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            {movie.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                            ):(
                                <div style={{ width: 200, height: 300, background: "#ccc"}}>Brak obrazu</div>  
                            )}
                            <p>{movie.title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            </motion.div>
        );
}

export default GenrePage;




