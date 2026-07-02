import { useEffect, useMemo, useState } from 'react';
import productService from '../services/productService';
import { toArray } from '../utils/arrays';

const limitProducts = (products, limit) => {
    if (!limit) {
        return products;
    }

    return products.slice(0, limit);
};

const useProducts = ({
    categoryId = null,
    minPrice = '',
    maxPrice = '',
    keyword = '',
    limit = null
} = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');

                const hasFilter = categoryId || minPrice !== '' || maxPrice !== '';
                const data = keyword && !hasFilter
                    ? await productService.searchProducts(keyword)
                    : await productService.filterProducts({
                        categoryId,
                        minPrice,
                        maxPrice,
                        keyword
                    });

                setProducts(toArray(data));
            } catch (error) {
                console.error('Lỗi khi tải danh sách sản phẩm:', error);
                setProducts([]);
                setError(error?.response?.data?.message || 'Không thể tải danh sách sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, keyword, maxPrice, minPrice]);

    const visibleProducts = useMemo(() => {
        return limitProducts(products, limit);
    }, [limit, products]);

    return {
        products: visibleProducts,
        loading,
        error
    };
};

export default useProducts;
