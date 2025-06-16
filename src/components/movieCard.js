import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {
    return (
        <li className="movie-item">
            <Link to={`/movie/${movie.id}`}>
                {movie.poster_path ?(
                    <img
                    src ={`https://image.tmdb.org/t/p/w200${movie.poster.path}`}
                    alt={movie.title}
                    />
                ) : (
                    <div style={{ width: 200, height: 300, background: "#ccc"}}>
                    Brak Obrazu    
                    </div>
                )}
                <p>{movie.title}</p>
            </Link>
        </li>
    );
};
export default MovieCard;