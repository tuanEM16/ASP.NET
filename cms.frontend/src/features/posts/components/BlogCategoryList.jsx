import React from 'react';

const BlogCategoryList = ({ categories = [], loading, selectedCategoryId, onSelectCategory }) => {
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
