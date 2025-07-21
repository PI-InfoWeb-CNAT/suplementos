import axios from 'axios';

const url = process.env.API_URL ?? "http://localhost:8000";

const instance = axios.create({
    baseURL: url,
})

export default instance;