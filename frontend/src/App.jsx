import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ShowDetails from "./pages/ShowDetails";


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
                <Routes>
                  <Route path="/" element={<Navigate to="/shows" replace />} />
                  <Route path="/shows" element={<Home />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/shows/:id" element={<ShowDetails />} />
                </Routes>
            </div>
          </div>
        </div>
      </main>
    </MovieProvider>
  );
}

export default App;
