import React from 'react';
import ProductFilter from '../../components/public/product/ProductFilter';
import ProductGrid from '../../components/public/product/ProductGrid';
import useProductCategories from '../../hooks/useProductCategories';
import useProducts from '../../hooks/useProducts';

const ProductsPage = ({ selectedCategoryId, onSelectCategory, onViewProduct, onBuyNow }) => {
    const productCategories = useProductCategories();
    const productList = useProducts({ categoryId: selectedCategoryId });

    return (
        <div className="container page-section">
            <div className="page-title">
                <p className="section-kicker">Shop</p>
                <h1>Tất cả kính mắt</h1>
                <span>Lọc theo danh mục để xem đúng nhóm kính bạn cần.</span>
            </div>
            <ProductFilter
                categories={productCategories.categories}
                loading={productCategories.loading}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={onSelectCategory}
            />
            <ProductGrid
                products={productList.products}
                loading={productList.loading}
                heading="Danh sách kính mắt"
                intro="Toàn bộ sản phẩm kính mắt đang có trong shop."
                onViewDetail={onViewProduct}
                onBuyNow={onBuyNow}
            />
        </div>
    );
};

export default ProductsPage;
