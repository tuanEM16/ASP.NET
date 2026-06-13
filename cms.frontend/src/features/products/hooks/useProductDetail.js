import { useEffect, useState } from 'react';
import productService from '../services/productService';

const useProductDetail = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await productService.getProductById(productId);
                setProduct(data || null);
            } catch (error) {
                console.error('Lỗi tải chi tiết sản phẩm:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return {
        product,
        loading
    };
};

export default useProductDetail;
