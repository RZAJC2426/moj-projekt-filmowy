import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

const API ="https://api.themoviedb.org/3";
const key = process.env.REACT_APP_TMDB_API_KEY;

const cardVariants = {
    hidden: { opacity: 0, y: 20},
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05},
    }),
};

function GenrePage() {
    const {genreId} = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setError(null);
            const [genreRes, movieRes] = await Promise.all([
                axios.get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`),
                axios.get(`${API}/discover/movie?api_key=${key}&with_genres=${genreId}&language=pl-PL`),
                ]);
            
             const genre = genreRes.data.genres.find((g) => String(g.id) === genreId);
             setGenreName(genre?.name || "Nieznany gatunek");
             setMovies(movieRes.data.results);
        }    catch (err) {
                console.error("Błąd pobierania filmów wg. gatunku", err);
                setError("Nie udało się załadować filmów.");
                }
            }; 

            fetchData();
        }, [genreId]);

        return (
            <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition ={{ duration: 0.4}}
            >
            <h2>Gatunek: {genreName}</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <motion.ul 
            className="movie-grid"
            initial="hidden"
            animate="visible"
            >
                {movies.map((m, i) => (
                    <motion.li 
                    key={m.id} 
                    className="movie-item"
                    variants={cardVariants}
                    custom={i}
                    >
                        <Link to={`/movie/${m.id}`}>
                        {m.poster_path ? (
                        <motion.img 
                        src={
                            `https://image.tmdb.org/t/p/w200${m.poster_path}`}
                            alt={m.title}
                            loading="lazy"
                            whileHover={{ scale: 1.05}}
                            />
                        ):(
                            <div style={{ width: 200, height: 300, background: "#ccc",
                        display: "flex", alignItems: "center", justifyContent: "center"  }}>
                            Brak Obrazu
                        </div>
                        )}
                        <p>{m.title}</p>
                        </Link>
                    </motion.li>
                ))}
                </motion.ul>
            </motion.div>
        );
}

export default GenrePage;




