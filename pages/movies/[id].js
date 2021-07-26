import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/layout';
import movieController from '../api/movies/movies';

function MovieDetail({ id }) {
    const isInitialLoad = useRef(true);
    const [film, setFilm] = useState(null);

    const fetchFilm = async () => {
        const { movies } = await movieController.fetchFilm(id);
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

    console.log(film)
    return (
        <Layout>
            <div className="bg-gray-100 w-4/5 rounded px-6 m-auto h-screen pl-24">
                <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">
                    {film.title}
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="flex space-x-4">
                            <div>Movie</div>
                            <div>{film.year}</div>
                            <div>{film.rated}</div>
                        </div>
                    </div>
                    <div>

                        <div className="flex flex-row-reverse space-x-4 space-x-reverse ...">
                            <div>Your Rating</div>
                            <div>{film.imdb.rating}</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="m-auto">
                        <img src={film.poster} alt="Poster" />
                    </div>
                    <div className="m-auto">
                        <h1 className="text-4xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">Plot:</h1>
                        <p>
                            {film.fullplot}
                        </p>
                        <h1 className="text-4xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">Awards:</h1>
                        <ul class="list-disc">
                            <li>{film.awards.nominations}</li>
                            <li>{film.awards.text}</li>
                            <li>{film.awards.wins}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </Layout >
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