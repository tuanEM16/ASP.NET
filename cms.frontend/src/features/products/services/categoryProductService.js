import axiosClient from '../../../config/axios';

const categoryProductService = {
    getAllCategoryProducts: () => {
        const url = '/CategoryProductApi';
        return axiosClient.get(url);
    }
};

export default categoryProductService;
