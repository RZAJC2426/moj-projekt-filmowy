import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API = "https://api.themoviedb.org/3";
const key= process.env.REACT_APP_TMDB_API_KEY;

function GenresDropdown() {
    const [genres, setGenres] =useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`)
            .then((res) => setGenres(res.data.genres))
            .catch((err) => console.error("Błąd pobierania gatunków", err));
    }, []);

    const toggleDropdown = () => setOpen(prev => !prev);

    return (
        <div
        className="dropdown">
            <button 
            className="dropdown_label"
            aria-haspopup="true"
            onClick={toggleDropdown}
            aria-expanded={open}
            style={{display: "flex", alignItems:"center", gap: "0,5em",
            background:"none", border:"none", color:"white", cursor:"pointer"}}
            ><span className="Gatunki">Gatunki ▼</span>
            <motion.span
            animate={{rotate: open ? 180 : 0}}
            transition={{ duration: 0.3 }}
            style={{display:"inline-block"}}>
                
            </motion.span>
            </button>
            <AnimatePresence>
        {open && (
            <motion.ul 
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1,y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            >
                {genres.map((genre) => (
                <li key={genre.id}>
                    <NavLink to={`/gatunek/${genre.id}`} onClick={() => setOpen(false)}>
                        {genre.name}
                    </NavLink>
                </li>
                ))}
            </motion.ul>
        )}
        </AnimatePresence>
        </div>
    );
}

export default GenresDropdown;