import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import MovieDetails from './features/movies/MovieDetails';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ScrollToTop from './components/ScrollToTop';
import AnimatedRoutes from './components/AnimatedRoutes';
import GenresMenu from './components/GenresMenu';
import GenresDropdown from './components/GenresDropdown';
import ThemeToggle from './components/ThemeToggle';


export default function App() {
  const [dark, setDark] = useState(() => 
  localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.body.className = dark ? 'dark-mode' : '';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

    return (
      <Router>
        <ScrollToTop/>
        <header className='main-header'>
          <nav>
            <NavLink to="/" end>Filmy</NavLink>
            <GenresDropdown />
            <NavLink to="/kontakt">Kontakt</NavLink>
            <NavLink to="/o-nas">O nas</NavLink>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
          </nav></header>
      <main>
        <AnimatedRoutes />
      </main>
      <footer className='main-footer'>
        &copy; {new Date().getFullYear()} Aplikacja Filmowa
      </footer>
      </Router>
    );
}





























/*
return(
  <div style={{ padding: "2em" }}>
    <h1>Filmy - {category}</h1>
    <nav style={{ marginBottom: "1em" }}>
      <button onClick={() => setCategory("popular")}>Popularne</button>
      <button onClick={() => setCategory("top_rated")}>TOP</button>
      <button onClick={() => setCategory("upcoming")}>Nadchodzące</button>
    </nav>
    
    {status === "loading" && <p>Ładowanie...</p>}
    {status === "failed" && <p style={{ color:"red" }}>{error}</p>}

    <ul className='movie-grid'>
      {list.map((m) => (
      <li key={m.id} className='movie-item'>
      {m.poster_path ? (
      <img 
      src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} 
      alt={m.title}
      />
      ) : (
        <div style={{ width:200, height:300, background: "#ccc" }}>Brak Obrazu</div>
      )}
      <p>{m.title}</p>
      </li>
      ))}
      </ul>
  </div>
);
}*/




/*function Home() {
  const dispatch = useDispatch();
  const {list, status, error } = useSelector((s) => s.movies);
  const [category, setCategory] = useState("popular");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchPopular(category,page));
  }, [category,page, dispatch]);

  const handlePageChange =(newPage) =>{
    setSearchParams({ page: newPage});
  };

  return(
    <div style={{ padding: "2em" }}>
      <h1>Filmy - {category}</h1>
      <nav style={{ marginBottom: "1em" }}>
        <button onClick={() => setCategory("popular")}>Popularne</button>
        <button onClick={() => setCategory("top_rated")}>TOP</button>
        <button onClick={() => setCategory("upcoming")}>Nadchodzące</button>
      </nav>
      
      {status === "loading" && <p>Ładowanie...</p>}
      {status === "failed" && <p style={{ color:"red" }}>{error}</p>}

      <ul className='movie-grid'>
        {list.map((m) => (
        <MovieCard key={m.id} movie={m}/>
        ))}
        </ul>

        <div style={{ marginTop: '1em'}}>
        <button onClick={() => handlePageChange(page -1)} disabled={page <= 1}>Poprzednia</button>
        <span style={{ margin: '0 1em '}}> Strona {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>Następna</button>
        </div>
        </div>
  );
}

function App(){
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movie/:id' element={<MovieDetails />}/>
    </Routes>
  );
}
*/