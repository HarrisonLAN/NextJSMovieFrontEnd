import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/layout';
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
        <Layout>

            
        </Layout>
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