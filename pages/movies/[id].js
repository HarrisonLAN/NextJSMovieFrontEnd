import React, { useState, useEffect } from 'react';
import movieController from '../api/movies/movies'
import { useRouter } from 'next/router'

function MovieDetail() {
    useEffect(() => {
        fetchFilm();
    }, []);
    const [film, setFilm] = useState(null);
    const [comments, setComments] = useState(null);

    const fetchFilm = async () => {
        const router = useRouter()
        const { pid } = router.query
        const getFilm = await movieController.fetchFilm();
        console.log(getFilm);
        setFilms(getFilm);
    }
    if (!film) return <div> loading... </div>
    return (
        <div>
            <h1>{film.title}</h1>
            <p>{film.plot} {film.imdb.rating}</p>
        </div>

    );
}

export default MovieDetail;