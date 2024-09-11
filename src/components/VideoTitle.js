import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className=' w-screen h-screen aspect-video pt-[15%] px-16 absolute z-10 text-white bg-gradient-to-r from-black'>
       <h1 className='text-6xl font-bold'> {title}</h1>
       <p className='py-4 text-m w-1/3'>{overview}</p>
       <div>
        <button className='bg-white p-2 px-10 text-lg  text-black rounded-lg hover:bg-opacity-50'>▶ Play</button>
        <button className=' bg-gray-600 mx-2 p-2 px-8 text-lg bg-opacity-50 text-white rounded-lg'>More Info</button>
       </div>
    </div>
  )
}

export default VideoTitle