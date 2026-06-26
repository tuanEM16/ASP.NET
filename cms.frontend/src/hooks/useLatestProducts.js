import { useEffect, useState } from 'react';
import productService from '../services/productService';
import { toArray } from '../utils/arrays';

const useLatestProducts = (take = 3) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getLatestProducts(take);
                setProducts(toArray(data).slice(0, take));
            } catch (error) {
                console.error('Lỗi khi tải 3 sản phẩm mới nhất:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestProducts();
    }, [take]);

    return {
        products,
        loading
    };
};

export default useLatestProducts;
