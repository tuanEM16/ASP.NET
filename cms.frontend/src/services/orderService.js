import axiosClient from './api';

const orderService = {
    createOrder: (payload) => axiosClient.post('/OrderApi', payload)
};

export default orderService;
