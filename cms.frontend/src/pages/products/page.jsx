import React from 'react';
import ProductFilter from '../../components/public/product/ProductFilter';
import ProductGrid from '../../components/public/product/ProductGrid';
import useProductCategories from '../../hooks/useProductCategories';
import useProducts from '../../hooks/useProducts';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import productService from '../../services/productService';

const ProductsPage = ({
    selectedCategoryId,
    onSelectCategory,
    searchKeyword,
    onClearSearch,
    onViewProduct,
    onBuyNow
}) => {
    const [minPrice, setMinPrice] = React.useState('');
    const [maxPrice, setMaxPrice] = React.useState('');
    const [priceRange, setPriceRange] = React.useState(null);
    const debouncedMinPrice = useDebouncedValue(minPrice);
    const debouncedMaxPrice = useDebouncedValue(maxPrice);
    const productCategories = useProductCategories();
    const productList = useProducts({
        categoryId: selectedCategoryId,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        keyword: searchKeyword
    });

    React.useEffect(() => {
        productService.getPriceRange()
            .then(setPriceRange)
            .catch(() => setPriceRange(null));
    }, []);

    return (
        <div className="container page-section">
            <div className="page-title">
                <div>
                    <p className="section-kicker">Shop</p>
                    <h1>Tất cả kính mắt</h1>
                    <span>Lọc theo danh mục và khoảng giá để tìm đúng mẫu kính bạn cần.</span>
                </div>
            </div>
            <ProductFilter
                categories={productCategories.categories}
                loading={productCategories.loading}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={onSelectCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                searchKeyword={searchKeyword}
                onClearSearch={onClearSearch}
            />
            {productList.error && <div className="alert alert-warning">{productList.error}</div>}
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
