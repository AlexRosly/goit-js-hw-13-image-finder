import axios from 'axios';


// Your API key: 22619356-ee7eba8b5a411fda9a95fba73

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `22619356-ee7eba8b5a411fda9a95fba73`;

async function fetchImage(searchQuery, page, perPage) {
    const SEARCH_PARAMS = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&${SEARCH_PARAMS}`);
    return response.data;
}

export default { fetchImage };

