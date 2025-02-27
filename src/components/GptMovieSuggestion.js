import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestion = () => {
    const gpt = useSelector(store => store.gpt)
    const {movieResults, movieNames}=gpt
    if(!movieNames)return null;
  return (
    <div className='p-4 m-4 bg-black text-white'>
        <div>
            {movieNames.map((movie,i) =><MovieList key={movieNames} title ={movieNames} movies = {movieResults[i]}/>)}
            
        </div>



    </div>
  )
}

export default GptMovieSuggestion