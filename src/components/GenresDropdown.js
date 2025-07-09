import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const API = "https://api.themoviedb.org/3";
const key= "a1b942395ebe30f4f491d5c7f0cdb7fd";

function GenresDropdown() {
    const [genres, setGenres] =useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`)
            .then((res) => setGenres(res.data.genres))
            .catch((err) => console.error("Błąd pobierania gatunków", err));
    }, []);

    return (
        <div
        className="dropdown"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        >
        <span className="dropdown_label" aria-haspopup="true">Gatunki</span>
        {open && (
            <ul className="dropdown-menu">
                {genres.map((genre) => (
                <li key={genre.id}>
                    <NavLink to={`/gatunek/${genre.id}`} onClick={() => setOpen(false)}>
                        {genre.name}
                    </NavLink>
                </li>
                ))}
            </ul>
        )}
        </div>
    );
}

export default GenresDropdown;