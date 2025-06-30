import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import { fetchMovies } from "../features/movies/moviesSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cardVariants = {
    hidden: {opacity: 0, y: 20},
    visible: (i) => ({
        opacity:1,
        y:0,
        transition:{delay: i * 0.05},
    }),
};

function Home() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("popular");
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState("");

    const moviesState = useSelector((s) => s.movies) || {};
    const {
        list = [],
        status = "idle",
        error = null,
        page = 1,
        totalPages = 1,
    } = moviesState;

    useEffect(() => {
        dispatch(fetchMovies({category, page, query, genre})); 
    }, [category, page, query, genre, dispatch]);

    return (
        <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
            <h1>Filmy - {category}</h1>

            <nav>
                {["popular", "top_rated", "upcoming"].map((cat) => (
                    <motion.button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={category === cat ? "active" : ""}
                    >
                        {cat.toUpperCase()}
                    </motion.button>
                ))}
                
                <input
            type = "text"
            placeholder="Szukaj filmu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ margin: "1em 0", padding: "0.5em"}}
            />
            </nav>
            
            

            {status === "loading" && <p>Ładowanie</p>}
            {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
            
            <ul className="movie-grid">
                {Array.isArray(list) && list.map((m, i) => (
                    <motion.li
                    key={m.id}
                    className="movie-item"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom = {i}
                    >
                        <Link to={`/movie/${m.id}`}>
                            {m.poster_path ? (
                                <motion.img
                                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                                alt={m.title}
                                loading="lazy"
                                whileHover={{ scale: 1.05 }}
                                />
                            ): (
                                <div style={{ width: 200, height: 300, background: "#ccc"}}>Brak Obrazu</div>
                            )}
                            <p>{m.title}</p>
                        </Link>
                    </motion.li>
                ))}
            </ul>
            
            <div className="pagination">
                <button className="prev" disabled={page <= 1} onClick={() => dispatch(fetchMovies({ category, page: page - 1}))}>
                 Poprzednia   
                </button>
                <span>{page} / {totalPages}</span>
                <button className="next" disabled={page >= totalPages} onClick={() => dispatch(fetchMovies({category, page: page + 1}))}>
                 Następna   
                </button>
            </div>
        </motion.div> 
    );
}

export default Home;