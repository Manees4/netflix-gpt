import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
    console.log(movies)

    if (!Array.isArray(movies) || movies.length === 0) {
      return <div>No movies to display</div>;
    }
  return (
    <div className='px-6 '>
         <h1 className='text-2xl py-4 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll no-scrollbar'>
           
        <div className='flex'>
          {movies.map(m => <MovieCard key={m.id} posterPath={m.poster_path}/>)}
        
      
        </div>
        </div>
        
    </div>
  )
}

export default MovieList