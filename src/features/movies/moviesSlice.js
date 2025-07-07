import { createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { fetchTmdb } from "../../api/tmdb";

//thunk do pobierania popularnych filmów
export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    fetchTmdb
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

