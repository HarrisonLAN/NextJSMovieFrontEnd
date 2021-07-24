import axios from "axios";
const movieController = {};


movieController.fetchFilms = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}movies`);
    return data;
}
movieController.fetchFilm = async (id) => {
    console.log(id);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}movies/${id}`);
    return data;
}



module.exports = movieController;