import { useMovieContext } from "../contexts/MovieContext";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const ShowDetails = () => {
    const { favorites } = useMovieContext();

    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);

    const MovieGenres = ({ genres }) => {
        return genres.join(" | ");
    };

    const getDomain = (url) => {
        try {
            return new URL(url).hostname;
        } catch (error) {
            console.error("Invalid URL:", error);
            return url;
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/tvshows/${id}`)
            .then(response => {
                setShow(response.data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching show details:", error));
    }, [id]);

    if (loading) return <p className="text-center text-gray-300">Loading...</p>;

    if (!show) return <p className="text-center text-red-400">Show not found.</p>;


    return (
        <>
            <h1 className="my-4 font-bold text-gray-500 text-2xl">{show.name}</h1>
            <div className="relative flex flex-col md:flex-row w-full mb-6 bg-white">
                <div className="relative p-2.5 md:w-1/5 shrink-0 overflow-hidden">
                    <img
                        src={show.image}
                        alt={show.name}
                        className=" w-full rounded-md md:rounded-lg object-cover"
                    />
                </div>

                <div className="p-2.5">
                    <p className="mb-8 text-slate-600 leading-normal font-light">
                        <div dangerouslySetInnerHTML={{ __html: show.summary }} />
                    </p>
                    <div>
                        <a href={show.officialSite} class="rounded-md bg-cyan-600 py-2 px-4 border-[#3C948B] text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#3C948B] focus:shadow-none active:bg-[#3C948B] hover:bg-[#3C948B] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Watch Now
                        </a>
                    </div>
                </div>

                <div className="md:w-2/5 shrink-0 flex flex-col rounded-lg shadow-sm max-w-96 p-5 mb-6 border-slate-200 bg-clip-border bg-gray-100">
                    <div className="pb-4 m-0 mb-4 text-left text-slate-100 border-b border-slate-300">
                        <p className=" text-slate-800 text-xl font-semibold">
                            Show Info
                        </p>
                    </div>
                    <div className="p-0">
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center gap-4">
                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Network: </span>
                                    <a href={show.officialSite} className="text-[#3C948B] font-medium">{getDomain(show.officialSite)}</a>
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Schedule: </span>{show.schedule}
                                </p>
                            </li>
                            <li className="flex items-center gap-4">

                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Status: </span>{show.status}
                                </p>
                            </li>
                            <li className="flex items-center gap-4">

                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Show Type: </span>{show.showType}
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Genres: </span>
                                    <MovieGenres genres={show.genres} />
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Episodes ordered: </span>{show.episodesOrdered}
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Created by: </span>{show.developedBy}
                                </p>
                            </li>
                            <li className="flex items-center gap-4">
                                <p className="text-slate-600 leading-normal font-light">
                                    <span className="font-bold">Official site: </span>
                                    <a href={show.officialSite} className="text-[#3C948B] font-medium">{getDomain(show.officialSite)}</a>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowDetails;