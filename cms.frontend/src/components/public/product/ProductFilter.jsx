import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const ProductFilter = ({
    categories = [],
    loading,
    selectedCategoryId,
    onSelectCategory,
    minPrice,
    maxPrice,
    priceRange,
    onMinPriceChange,
    onMaxPriceChange,
    searchKeyword,
    onClearSearch
}) => {
    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục sản phẩm...</div>;
    }

    return (
        <div className="product-filter-panel">
            <div className="filter-title">
                <div><SlidersHorizontal size={18} /><strong>Bộ lọc sản phẩm</strong></div>
                <span>Thay đổi bộ lọc để cập nhật danh sách tự động</span>
            </div>

            {searchKeyword && (
                <div className="active-search">
                    <span>Kết quả tìm kiếm: <strong>{searchKeyword}</strong></span>
                    <button type="button" onClick={onClearSearch}>
                        <X size={15} />
                        Xóa từ khóa
                    </button>
                </div>
            )}

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

            <div className="price-filter">
                <div>
                    <label htmlFor="min-price">Đơn giá Min</label>
                    <input
                        id="min-price"
                        type="number"
                        min="0"
                        step="10000"
                        value={minPrice}
                        placeholder={priceRange ? String(priceRange.minPrice) : '0'}
                        onChange={(event) => onMinPriceChange(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="max-price">Đơn giá Max</label>
                    <input
                        id="max-price"
                        type="number"
                        min="0"
                        step="10000"
                        value={maxPrice}
                        placeholder={priceRange ? String(priceRange.maxPrice) : 'Không giới hạn'}
                        onChange={(event) => onMaxPriceChange(event.target.value)}
                    />
                </div>
                {priceRange && (
                    <span>
                        Khoảng giá hệ thống: {formatCurrency(priceRange.minPrice)}
                        {' - '}
                        {formatCurrency(priceRange.maxPrice)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;
