import React, {useEffect, useState} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const [genreName, setGenreName] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [genreRes, movieRes] = await Promise.all([
                axios.get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`),
                axios.get(`${API}/discover/movie?api_key=${key}&with_genres=${genreId}&language=pl-PL&page=${currentPage}`),
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
        }, [genreId, currentPage]);

        const handlePrev = () => {
            const prev = Math.max(currentPage -1, 1);
            setSearchParams({ page: prev });
        };

        const handleNext = () => {
            const next = Math.min(currentPage + 1, totalPages);
            setSearchParams({ page: next});
        };


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
                <Link to={`/movie/${m.id}`}
                state={{
                    from:{
                        pathname:`/gatunek/${genreId}`,
                        page: currentPage,
                        genreName: genreName,
                    },
                }}
                >
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
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        Poprzednia
                    </button>
                    <span style={{ margin: "0 1em" }}> {currentPage} / {totalPages} </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                        Następna
                    </button>
                </div>
            </motion.div>
        );
}

export default GenrePage;




