import React from 'react';

const CategoryProductList = ({ categories = [], loading, selectedCategoryId, onSelectCategory }) => {
    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục sản phẩm...</div>;
    }

    return (
        <div className="category-strip">
            <button
                type="button"
                className={`category-chip ${selectedCategoryId === null ? 'active' : ''}`}
                onClick={() => onSelectCategory(null)}
            >
                Tất cả sản phẩm
            </button>

            {categories.length === 0 ? (
                <span className="text-muted small">Chưa có danh mục sản phẩm.</span>
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

export default CategoryProductList;
