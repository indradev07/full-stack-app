import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Favorites"));
const ShowDetails = lazy(() => import("./pages/ShowDetails"));

import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";

const App = () => {
  return (
    <MovieProvider>
      <NavBar />
      <main>
        <div className="max-w-screen mx-auto mt-7">
          <div className="py-14 mx-auto">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <Breadcrumb />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                <Route path="/" element={<Navigate to="/shows" replace />} />
                <Route path="/shows" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/shows/:id" element={<ShowDetails />} />
              </Routes>
              </Suspense>
            
            </div>
          </div>
        </div>
      </main>
    </MovieProvider>
  );
};

export default App;
