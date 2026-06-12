import axiosClient from '../api/axiosClient';

const categoryProductService = {
    getAllCategoryProducts: () => {
        const url = '/CategoryProductApi';
        return axiosClient.get(url);
    }
};

export default categoryProductService;
