import ShowCard from "../components/ShowCard";
import { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { fetchTvShows } from "../services/tvShowApi";

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTvShows().then(setShows);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!shows.length) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen text-white w-full">
      <h1 className="my-4 font-bold text-gray-500 text-2xl">Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 gap-6">
        {shows.map((show) => (
          <ShowCard show={show} key={show.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
