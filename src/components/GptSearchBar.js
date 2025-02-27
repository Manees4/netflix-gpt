import React, { useRef } from 'react';
import lang from '../utils/languageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error('Error fetching movie data from TMDB:', error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    try {
      const query = searchText.current.value;
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Only provide the names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, GOAT`;

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(',').map((movie) => movie.trim());

      if (!gptMovies || gptMovies.length === 0) {
        console.warn('No movies received from GPT.');
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResult({ movieNames: gptMovies, moviesReults: tmdbResults }));
    } catch (error) {
      console.error('Error during GPT search:', error);
    }
  };

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type='text'
          className='p-4 m-4 col-span-9'
          placeholder={lang[langKey].gptPlaceHolder}
        />
        <button
          className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4'
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
