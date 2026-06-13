import axiosClient from '../../../config/axios';

const productService = {
    getAllProducts: () => {
        const url = '/ProductApi';
        return axiosClient.get(url);
    },

    getProductById: (id) => {
        const url = `/ProductApi/${id}`;
        return axiosClient.get(url);
    }
};

export default productService;
