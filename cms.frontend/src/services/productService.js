import axiosClient from './api';

const productService = {
    getAllProducts: () => {
        const url = '/ProductApi';
        return axiosClient.get(url);
    },

    getLatestProducts: (take = 3) => {
        const url = `/ProductApi/latest?take=${take}`;
        return axiosClient.get(url);
    },

    getProductById: (id) => {
        const url = `/ProductApi/${id}`;
        return axiosClient.get(url);
    }
};

export default productService;
