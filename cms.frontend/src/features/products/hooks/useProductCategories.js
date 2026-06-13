import { useEffect, useState } from 'react';
import categoryProductService from '../services/categoryProductService';
import { toArray } from '../../../utils/arrays';

const useProductCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryProductService.getAllCategoryProducts();
                setCategories(toArray(data));
            } catch (error) {
                console.error('Lỗi tải danh mục sản phẩm:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return {
        categories,
        loading
    };
};

export default useProductCategories;
