import axiosClient from './api';

const categoryProductService = {
    getAllCategoryProducts: () => {
        const url = '/CategoryProductApi';
        return axiosClient.get(url);
    }
};

export default categoryProductService;
