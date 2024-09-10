import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constant';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);

    const getMovieVideos = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
            const json = await response.json();

            if (response.ok) {
                const filterData = json.results.filter(v => v.type === 'Trailer');
                const trailer = filterData.length ? filterData[0] : json.results[0];
                dispatch(addTrailerVideo(trailer));
            } else {
                console.error('Failed to fetch trailer videos:', json.status_message);
            }
        } catch (error) {
            console.error('Error fetching trailer videos:', error);
        }
    };

    useEffect(() => {
        if (!trailerVideo) {
            getMovieVideos();
        }
    }, [movieId, trailerVideo, dispatch]);

    return trailerVideo; // Optional: Return trailerVideo if needed in the component
};

export default useMovieTrailer;




