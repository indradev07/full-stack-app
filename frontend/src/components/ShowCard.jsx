import { Link } from "react-router-dom";

import { useMovieContext } from "../contexts/MovieContext"


const ShowCard = ({ show, style }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(show.id)

    function onFavoriteClick(e) {
        e.preventDefault()
         favorite ? removeFromFavorites(show.id) : addToFavorites(show);
    }

    return (

            <Link to={`/shows/${show.id}`}>
            <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
                <div className="relative h-56 overflow-hidden text-white rounded-md rounded-b-none">
                    <img className="w-full" src={show.image} alt={show.image} />
                </div>
                <div className="absolute top-4 right-4 text-white text-2xl p-2 bg-transparent border border-white bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition duration-200 hover:bg-opacity-70">
                    <button className={`${favorite ? "text-red-500" : "text-white-500"}`} onClick={onFavoriteClick} aria-label="Toggle Favorite">
                        ♥
                    </button>
                </div>
                <div className="p-4 pb-0">
                    <div className="flex items-center mb-2">
                        <h6 className="text-[#3C948B] text-xl font-semibold">
                            {show.name}
                        </h6>
                    </div>
                </div>

                <div className="p-4 pt-0 mb-2 group inline-flex flex-wrap justify-between items-center gap-2">
                    <button className="rounded-full border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-[#3C948B] hover:border-[#3C948B] focus:text-white focus:bg-[#3C948B] focus:border-[#3C948B] active:border-[#3C948B] active:text-white active:bg-[#3C948B] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        {show.language}
                    </button>
                    <button className="rounded-full border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-[#3C948B] hover:border-[#3C948B] focus:text-white focus:bg-[#3C948B] focus:border-[#3C948B] active:border-[#3C948B] active:text-white active:bg-[#3C948B] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <div className="flex items-center gap-0 5 ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="w-5 h-5 text-yellow-600">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span className="text-slate-600 ml-1.5">{show.rating == 'NaN' ? '0' : show.rating }</span>
                        </div>
                    </button>
                </div>
            </div>
            </Link>
    )


}

export default ShowCard