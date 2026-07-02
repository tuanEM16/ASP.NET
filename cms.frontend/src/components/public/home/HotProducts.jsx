import ProductGrid from '../product/ProductGrid';
import useHotProducts from '../../../hooks/useHotProducts';

const HotProducts = ({ onViewDetail, onBuyNow, sectionId }) => {
    const hotProducts = useHotProducts(3);

    return (
        <ProductGrid
            products={hotProducts.products}
            loading={hotProducts.loading}
            heading="Sản phẩm Hot / Bán chạy"
            intro="3 sản phẩm có tổng số lượng bán cao nhất từ API ProductApi/hot."
            onViewDetail={onViewDetail}
            onBuyNow={onBuyNow}
            showSoldQuantity
            sectionId={sectionId}
        />
    );
};

export default HotProducts;
