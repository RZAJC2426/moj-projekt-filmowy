import { createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
const API = "https://api.themoviedb.org/3";
const key = "a1b942395ebe30f4f491d5c7f0cdb7fd";


//thunk do pobierania popularnych filmów
export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async ({category, page = 1, query ="",genre = "" }) => {
        let url = `${API}/movie/${category}?api_key=${key}&page=${page}`;
        if (query) url = `${API}/search/movie?api_key=${key}&query=${query}&page=${page}`;
        if (genre) url += `&with_genres=${genre}`;
        const res = await axios.get(url);
        return res.data;
    }
);

const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        list:[],
        status:"idle",
        error:null,
        page: 1,
        totalPages: 1,
    },
        reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status ="loading";
            })
            .addCase(fetchMovies.fulfilled, (state,action)=>{
            state.status="succeeded";
            state.list=action.payload.results;
            state.page = action.payload.page;
            state.totalPages = action.payload.total_pages;
})
    .addCase(fetchMovies.rejected,(state,action) => {
        state.status="failed";
        state.error = action.error.message;
    });
    },
});

export default moviesSlice.reducer;

