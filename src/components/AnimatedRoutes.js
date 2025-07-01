import React from "react";
import { Routes,Route, useLocation } from "react-router-dom";
/*import { AnimatePresence, motion } from "framer-motion";*/
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import MovieDetails from "../features/movies/MovieDetails";
import GenrePage from "./GenrePage";

function AnimatedRoutes(){
    const location = useLocation();
    return (
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}/>
                <Route path="/kontakt" element={<Contact/>}/>
                <Route path="/o-nas" element={<About/>}/>
                <Route path="/movie/:id" element={<MovieDetails/>}/>
                <Route path="/gatunek/:genreId" element={<GenrePage />}/>
            </Routes>
        
    );
}

/*const PageWrapper = ({ children }) => (
    <motion.div
    initial={{opacity: 0, y:20}}
    animate={{opacity: 1, y:0 }}
    exit={{ opacity: 0, y:-20 }}
    transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);*/
export default AnimatedRoutes;