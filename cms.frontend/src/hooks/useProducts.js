import { useEffect, useMemo, useState } from 'react';
import productService from '../services/productService';
import { toArray } from '../utils/arrays';

const filterProducts = (products, categoryId) => {
    if (!categoryId) {
        return products;
    }

    return products.filter((item) => item.categoryProductId === categoryId);
};

const limitProducts = (products, limit) => {
    if (!limit) {
        return products;
    }

    return products.slice(0, limit);
};

const useProducts = ({ categoryId = null, limit = null } = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(toArray(data));
            } catch (error) {
                console.error('Lỗi khi tải danh sách sản phẩm:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const visibleProducts = useMemo(() => {
        const filteredProducts = filterProducts(products, categoryId);
        return limitProducts(filteredProducts, limit);
    }, [categoryId, limit, products]);

    return {
        products: visibleProducts,
        loading
    };
};

export default useProducts;
