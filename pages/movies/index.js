import React, { useState, useEffect } from 'react';
import movieController from'../api/movies/movies'
import Link from 'next/link'

function Movies() {

    useEffect(() => {
        fetchFilms();
    }, []);

    const [films, setFilms] = useState([]);

    const fetchFilms = async () => {
        const res = await movieController.fetchFilms();
        console.log(res.movies)
        setFilms(res.movies);
        console.log(films);    
    }
    if (!films) return <div> loading... </div>
    return (
        <div>
            {films.map(item => (
                  <h1 key={item._id}>
                  <Link to={`/movies/${item._id}`}>{item.title}</Link>
              </h1>
            ))}
            
        </div>

    );
}

export default Movies;