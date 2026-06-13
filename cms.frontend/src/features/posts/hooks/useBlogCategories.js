import { useEffect, useState } from 'react';
import postService from '../services/postService';
import { toArray } from '../../../utils/arrays';

const useBlogCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await postService.getBlogCategories();
                setCategories(toArray(data));
            } catch (error) {
                console.error('Lỗi tải danh mục bài viết:', error);
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

export default useBlogCategories;
