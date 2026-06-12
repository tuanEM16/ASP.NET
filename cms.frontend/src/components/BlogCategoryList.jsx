import React, { useEffect, useState } from 'react';
import blogService from '../services/blogService';

const BlogCategoryList = ({ selectedCategoryId, onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await blogService.getBlogCategories();
                setCategories(data);
            } catch (error) {
                console.error('Lỗi tải danh mục bài viết:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục bài viết...</div>;
    }

    return (
        <div className="category-strip">
            <button
                type="button"
                className={`category-chip ${selectedCategoryId === null ? 'active' : ''}`}
                onClick={() => onSelectCategory(null)}
            >
                Tất cả bài viết
            </button>

            {categories.length === 0 ? (
                <span className="text-muted small">Chưa có danh mục bài viết.</span>
            ) : (
                categories.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`category-chip ${selectedCategoryId === item.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(item.id)}
                    >
                        {item.name}
                    </button>
                ))
            )}
        </div>
    );
};

export default BlogCategoryList;
