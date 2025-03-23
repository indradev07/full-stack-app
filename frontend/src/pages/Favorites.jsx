import { useMovieContext } from "../contexts/MovieContext";
import ShowCard from "../components/ShowCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <>
        <div className="min-h-screen text-white w-full">
          <h1 className="my-4 font-bold text-gray-500 text-2xl">Your Favorites</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            {favorites.map((show) => (
              <ShowCard show={show} key={show.id} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Show Yet</h2>
      <p>Start adding shows to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
