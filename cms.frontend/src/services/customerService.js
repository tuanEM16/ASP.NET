import axiosClient from './api';

const customerService = {
    register: (payload) => axiosClient.post('/CustomerApi/register', payload)
};

export default customerService;
