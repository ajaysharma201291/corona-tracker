import axios from 'axios';

const axiosInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

const Service = {
    getInstance: axiosInstance
}

export default Service;