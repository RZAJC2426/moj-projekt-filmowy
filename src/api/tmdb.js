import axios from "axios";

const API = "https://api.themoviedb.org/3";
const KEY = process.env.REACT_APP_TMDB_API_KEY;

export const fetchTmdb = ({category, page, query, genre}) =>{
    let url = query
    ? `${API}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
    : `${API}/movie/${category}?api_key=${KEY}&page=${page}${genre ? `&with_genres=${genre}` : ''}`;
   
  return axios.get(url).then(res=> res.data);  
};