import React, { useState, useEffect, useRef } from 'react';
import movieController from '../api/movies/movies';
import Link from 'next/link';
import Layout from '../../components/layout'

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
        setFilms(res.movies);
    };

    if (!films?.length > 0) return <div> Temp loading... </div>;

    console.log(films);
    var i = 0;

    return (
        <Layout>
                <div className="bg-gray-100 w-4/5 rounded px-6 ">
                    <div className="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
                        <div className="font-semibold text-gray-800">Top Rated Movies</div>
                    </div>

                            {films.map((item) => (
                    
                                <div key={item._id}>
                                    <hr className="-mx-6"></hr>
                                    <div className="flex items-center justify-between my-4">
                                    <div className="w-16">
                                        <img className="w-12 h-12 rounded-full" src={item.poster}/>
                                    </div>
                                    <div class="flex-1 pl-2">
                                        <div class="text-gray-700 font-semibold">
                                            {i=i+1}: {item.title}
                                        </div>
                                        <div class="text-gray-600 font-thin">
                                            {item.plot}
                                        </div>
                                    </div>
                                    <Link className="text-red-400" href={`/movies/${item._id}`}>Read More</Link>
                                    </div>
                                </div>
                            ))}
                </div>
        </Layout>
    )
}

export default Movies;