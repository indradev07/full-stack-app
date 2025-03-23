import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        if (favorites.length > 0) { 
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    const addToFavorites = (show) => {
        setFavorites(prev => [...prev, show]);
    };

    const removeFromFavorites = (showId) => {
        setFavorites(prev => prev.filter(show => show.id !== showId));
    };

    const isFavorite = (showId) => {
        return favorites.some(show => show.id === showId);
    };

    return (
        <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </MovieContext.Provider>
    );
};
