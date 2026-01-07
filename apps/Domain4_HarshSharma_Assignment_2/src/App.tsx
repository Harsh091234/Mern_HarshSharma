import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './screens/Homepage'
import MoviePage from './screens/MoviePage'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/movie/:title' element={<MoviePage />} />
        </Routes>
    </div>
  )
}

export default App
