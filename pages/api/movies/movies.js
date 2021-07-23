import axios from "axios";
const movieController = {};


movieController.fetchFilms = async () => {
    const data  = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}movies`);
    return data.data;
}
movieController.fetchFilm = async ({ match }) => {
    const router = useRouter()
    const { pid } = router.query
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}movies/${match.params.id}`);
    return data;
}



module.exports = movieController;