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

    getHotProducts: (take = 3) => {
        const url = `/ProductApi/hot?take=${take}`;
        return axiosClient.get(url);
    },

    getPriceRange: () => axiosClient.get('/ProductApi/price-range'),

    searchProducts: (keyword) => axiosClient.get('/ProductApi/search', {
        params: { keyword }
    }),

    filterProducts: ({ minPrice, maxPrice, categoryId, keyword } = {}) => (
        axiosClient.get('/ProductApi/filter', {
            params: {
                minPrice: minPrice === '' ? undefined : minPrice,
                maxPrice: maxPrice === '' ? undefined : maxPrice,
                categoryId: categoryId || undefined,
                keyword: keyword || undefined
            }
        })
    ),

    getProductById: (id) => {
        const url = `/ProductApi/${id}`;
        return axiosClient.get(url);
    }
};

export default productService;
