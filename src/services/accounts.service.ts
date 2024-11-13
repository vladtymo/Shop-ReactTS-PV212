import axios from 'axios';

const api = import.meta.env.VITE_ACCOUNTS_API;

export default axios.create({
    baseURL: api
});