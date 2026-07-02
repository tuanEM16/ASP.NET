import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../../utils/images';

const CategoryGrid = ({
    categories = [],
    loading,
    selectedCategoryId,
    onSelectCategory
}) => {
    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục sản phẩm...</div>;
    }

    return (
        <section className="category-rail-section">
            <div className="category-rail-heading">
                <div>
                    <p className="section-kicker">Danh mục sản phẩm</p>
                    <h2>Chọn nhanh kiểu kính</h2>
                </div>
                <span>Chọn danh mục để lọc sản phẩm ngay bên dưới</span>
            </div>

            <div className="category-rail">
                <button
                    type="button"
                    className={`category-tile ${selectedCategoryId === null ? 'active' : ''}`}
                    onClick={() => onSelectCategory(null)}
                >
                    <span className="category-all-icon">Tất cả</span>
                    <span className="category-tile-copy">
                        <strong>Tất cả sản phẩm</strong>
                        <small>Xem toàn bộ</small>
                    </span>
                    <ChevronRight size={16} />
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        className={`category-tile ${selectedCategoryId === category.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category.id)}
                    >
                        {category.imageUrl ? (
                            <img src={getImageUrl(category.imageUrl)} alt="" />
                        ) : (
                            <span className="category-all-icon">{category.name.slice(0, 2)}</span>
                        )}
                        <span className="category-tile-copy">
                            <strong>{category.name}</strong>
                            <small>{category.productCount ?? 0} sản phẩm</small>
                        </span>
                        <ChevronRight size={16} />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
