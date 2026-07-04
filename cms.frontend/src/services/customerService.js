import axiosClient from './api';

const customerService = {
    register: (payload) => axiosClient.post('/CustomerApi/register', payload),
    login: (payload) => axiosClient.post('/CustomerApi/login', payload),
    forgotPassword: (email) => axiosClient.post('/CustomerApi/forgot-password', { email }),
    resetPassword: (payload) => axiosClient.post('/CustomerApi/reset-password', payload)
};

export default customerService;
