import React from 'react';
import CategoryProductList from '../../features/products/components/CategoryProductList';
import ProductList from '../../features/products/components/ProductList';
import useProductCategories from '../../features/products/hooks/useProductCategories';
import useProducts from '../../features/products/hooks/useProducts';

const ProductsPage = ({ selectedCategoryId, onSelectCategory, onViewProduct, onBuyNow }) => {
    const productCategories = useProductCategories();
    const productList = useProducts({ categoryId: selectedCategoryId });

    return (
        <div className="container page-section">
            <div className="page-title">
                <p className="section-kicker">Shop</p>
                <h1>Tất cả sản phẩm</h1>
                <span>Lọc theo danh mục để xem đúng nhóm sản phẩm bạn cần.</span>
            </div>
            <CategoryProductList
                categories={productCategories.categories}
                loading={productCategories.loading}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={onSelectCategory}
            />
            <ProductList
                products={productList.products}
                loading={productList.loading}
                heading="Danh sách sản phẩm"
                intro="Toàn bộ sản phẩm đang có trong shop."
                onViewDetail={onViewProduct}
                onBuyNow={onBuyNow}
            />
        </div>
    );
};

export default ProductsPage;
