import axiosClient from '../api/axiosClient';

const blogService = {
    getBlogCategories: () => {
        const url = '/CategoryApi';
        return axiosClient.get(url);
    },

    getAllPosts: () => {
        const url = '/PostApi';
        return axiosClient.get(url);
    },

    getPostsByCategory: (categoryId) => {
        const url = `/PostApi/category/${categoryId}`;
        return axiosClient.get(url);
    }
};

export default blogService;
