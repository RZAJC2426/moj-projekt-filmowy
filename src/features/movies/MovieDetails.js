import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API = "https://api.themoviedb.org/3";
const key = process.env.REACT_APP_TMDB_API_KEY;

function MovieDetails(){
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
    try {
        const res = await axios.get(`${API}/movie/${id}?api_key=${key}&language=pl-PL`);
        setMovie(res.data);
        } catch (err) {
            console.error("Błąd ładowania filmu:", err);
        }
    };

    const fetchProviders = async () => {
        try {
            const res = await axios.get(`${API}/movie/${id}/watch/providers?api_key=${key}`);
            const flatrate = res.data.results?.PL?.flatrate || [];
            setProviders(flatrate);
        } catch (err) {
            console.error("Błąd pobierania dostawców", err);
            }
        };

        fetchMovie();
        fetchProviders();
    }, [id]);

    if(!movie) return<p>Ładowanie...</p>;

    return (
        <motion.div
        className="movie-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <Link to="/">← Powrót</Link>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>

        {movie.poster_path && (
        <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
        />
        )}
        
        <p><strong> Premiera: </strong> {movie.release_date}</p>
        <p><strong> Ocena:</strong> {movie.vote_average}/10</p>
        {providers.length > 0 && (
            <div className="streaming-providers">
                <h4>Dostępny na platformach:</h4>
                <ul style={{
                    display: "flex", 
                    gap: "1em",
                    listStyle: "none",
                    padding: 0,
                    marginTop: "1em"
                }}>
                    {providers.map((prov) => (
                        <li key={prov.provider_id} style={{textAlign: "center "}}>
                            <img
                            src={`https://image.tmdb.org/t/p/w45${prov.logo_path}`}
                            alt={prov.provider_name}
                            style={{
                                borderRadius:"5px",
                                maxHeight:"40px",
                                background:"#fff",
                                padding:"4px"
                            }}
                            title={prov.provider_name}
                            />
                            <div style={{ fontSize: "0.8rem" }}>{prov.provider_name}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )} 
        {providers.length === 0 && <p>Brak danych o dostępności w Polsce.</p>}  
        </motion.div>
    );
}

export default MovieDetails;
