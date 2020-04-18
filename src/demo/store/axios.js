import axios from 'axios';

/**
 * Create a simple axios client
 *
 * @type {Axios}
 */
const axiosClient = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
    },
    baseURL: '',
});

export default axiosClient;
