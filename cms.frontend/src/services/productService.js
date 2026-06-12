import axiosClient from '../api/axiosClient';

const productService = {
    getAllProducts: () => {
        const url = '/ProductApi';
        return axiosClient.get(url);
    }
};

export default productService;
