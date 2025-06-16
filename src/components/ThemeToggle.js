import React from "react";
import {motion, AnimatePresence } from "framer-motion";

const iconVariants ={
    initial: { rotate: 0, opacity: 0},
    animate: { rotate: 360, opacity: 1}, 
    exit: { rotate: -360, opacity: 0},
};

function ThemeToggle({ darkMode, setDarkMode}) {
    return (
        <button
        className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            style={{
                background:"transparent",
                border:"none",
                cursor:"pointer",
                fontSize:"1.5rem",
                color:"white",
                marginLeft:"auto",
            }}
            aria-label="Przełącz tryb jasny/ciemny"
        >
            <AnimatePresence mode="wait">
                <motion.span
                key={darkMode ? "moon":"sun"}
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                >
                    {darkMode ? "🌙": "☀️" }
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

export default ThemeToggle;