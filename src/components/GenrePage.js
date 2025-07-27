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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [genreRes, movieRes] = await Promise.all([
                axios.get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`),
                axios.get(`${API}/discover/movie?api_key=${key}&with_genres=${genreId}&language=pl-PL&page=${page}`),
                ]);
            
             const genre = genreRes.data.genres.find((g) => String(g.id) === genreId);
             setGenreName(genre?.name || "Nieznany gatunek");
             setMovies(movieRes.data.results);
             setTotalPages(movieRes.data.total_pages);
        }    catch (err) {
                console.error("Błąd pobierania filmów wg. gatunku", err);
                }
            }; 

            fetchData();
        }, [genreId, page]);

        return (
            <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition ={{ duration: 0.4}}
            >
            <h2>Gatunek: {genreName}</h2>

            <motion.ul 
            className="movie-grid">
            {movies.map((m, i) => (
                <motion.li 
                key={m.id} 
                className="movie-item"
                variants={cardVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                >  
                <Link to={`/movie/${m.id}`}>
                    <motion.img 
                        src={
                            m.poster_path 
                            ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                            : " https://via.placeholder.com/200x300?text=Brak+obrazu"
                        }
                            
                            alt={m.title}
                            loading="lazy"
                            whileHover={{ scale: 1.05}}
                            />
                        <p>{m.title}</p>
                        </Link>
                    </motion.li>
                ))}
                </motion.ul>
                <div className="pagination">
                    <button onClick={() => setPage((p) => Math.max(p -1, 1))} disabled={page === 1}>
                        Poprzednia
                    </button>
                    <span style={{ margin: "0 1em" }}> {page} / {totalPages} </span>
                    <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                        Następna
                    </button>
                </div>
            </motion.div>
        );
}

export default GenrePage;




