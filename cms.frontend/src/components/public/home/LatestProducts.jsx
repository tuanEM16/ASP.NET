import ProductGrid from '../product/ProductGrid';
import useLatestProducts from '../../../hooks/useLatestProducts';

const LatestProducts = ({ onViewDetail, onBuyNow }) => {
    const latestProducts = useLatestProducts(3);

    return (
        <ProductGrid
            products={latestProducts.products}
            loading={latestProducts.loading}
            heading="Sản phẩm mới nhất"
            intro="3 mẫu kính mới nhất được gọi trực tiếp từ API ProductApi/latest."
            onViewDetail={onViewDetail}
            onBuyNow={onBuyNow}
        />
    );
};

export default LatestProducts;
