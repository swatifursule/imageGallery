import axios from 'axios';

import FETCH_IMAGE_DATA from '../store/actions';

//const API_ROOT_URL = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=true&tags=";
const API_ROOT_URL = "http://localhost:3020/images?q=";

export function fetchImage(searchTerm){
  const url =   API_ROOT_URL + searchTerm;
   const response = axios.get(url);
    return {
        type : FETCH_IMAGE_DATA,
        payload: response
    }
}
