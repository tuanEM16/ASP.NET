import axiosClient from './api';

const postService = {
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
    },

    getPostById: (id) => {
        const url = `/PostApi/${id}`;
        return axiosClient.get(url);
    }
};

export default postService;
