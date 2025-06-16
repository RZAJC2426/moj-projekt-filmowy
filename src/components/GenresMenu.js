import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const API = "https://api.themoviedb.org/3";
const key = process.env.REACT_APP_TMDB_API_KEY;

function GenresMenu() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios
            .get(`${API}/genre/movie/list?api_key=${key}&language=pl-PL`)
            .then((res) => setGenres(res.data.genres))
            .catch((err) => console.error("Błąd pobierania gatunków", err));
    }, []);

    return (
        <div className="genres-menu">
        <h4>Gatunki</h4>
        <ul>
            {genres.map((genre) => (
                <li key={genre.id}>
                    <NavLink to={`/gatunek/${genre.id}`}>{genre.name}</NavLink>
                </li>
            ))}
            </ul>
        </div>
    );
}
export default GenresMenu;