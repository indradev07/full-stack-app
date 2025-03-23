import axios from "axios";

const API_URL = "http://localhost:8080/api/tvshows";

export const fetchTvShows = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
