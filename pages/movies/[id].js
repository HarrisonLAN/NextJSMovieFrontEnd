import React, { useState, useEffect, useRef } from 'react';
import movieController from '../api/movies/movies';

function MovieDetail({ id }) {
    const isInitialLoad = useRef(true);
    const [film, setFilm] = useState(null);

    const fetchFilm = async () => {
        const { movies } = await movieController.fetchFilm(id);
        console.log(movies);
        setFilm(movies);
    };

    // Used just for initial load
    useEffect(() => {
        // check if its the initial load
        if (isInitialLoad.current && id) {
            fetchFilm();

            // set to false once completed initial setup
            isInitialLoad.current = false;
        }
    });

    if (!film) return <div> loading... </div>;

    return (
        <div>
            <h1>{film.title}</h1>
            <p>
                {film.plot} {film.imdb.rating}
            </p>
        </div>
    );
}
export async function getStaticPaths() {
    const paths = [];
    return { paths, fallback: true };
}

export function getStaticProps({ params }) {
    // get id from params
    const { id } = params;
    // pass id as a prop to the component
    return { props: { id } };
}

export default MovieDetail;