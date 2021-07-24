import React, { useState, useEffect, useRef } from 'react';
import movieController from '../api/movies/movies';
import Link from 'next/link';

function Movies() {
    const initialLoad = useRef(true);
    const [films, setFilms] = useState(null);

    useEffect(() => {
        if (initialLoad.current) {
            fetchFilms();
            initialLoad.current = false;
        }
    });

    const fetchFilms = async () => {
        const res = await movieController.fetchFilms();
        const { success, movies } = res;
        setFilms(movies);
    };

    if (!films?.length > 0) return <div> loading... </div>;

    return (
        <div>
            {films.map((item) => (
                <h1 key={item._id}>
                    <Link href={`/movies/${item._id}`}>{item.title}</Link>
                </h1>
            ))}
        </div>
    )
}

export default Movies;