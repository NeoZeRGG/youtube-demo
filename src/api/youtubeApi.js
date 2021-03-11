import axios from 'axios';

const API_KEY = "AIzaSyBd9GH1A3WPUJfH28HqrjvyyScasX8tXf0";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: API_KEY
  },
  headers: {}
});
