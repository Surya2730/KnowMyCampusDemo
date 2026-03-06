import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            if (user.isDemo) {
                config.headers['Demo-Mode'] = 'true';
                config.headers['Demo-User-Id'] = user.id;
            } else if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
