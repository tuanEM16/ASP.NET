import { useEffect, useState } from 'react';
import productService from '../services/productService';
import { toArray } from '../utils/arrays';

const useHotProducts = (take = 3) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getHotProducts(take);
                setProducts(toArray(data));
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm bán chạy:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHotProducts();
    }, [take]);

    return { products, loading };
};

export default useHotProducts;
