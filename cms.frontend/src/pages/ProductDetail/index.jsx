import React from 'react';
import ProductDetail from '../../features/products/components/ProductDetail';
import useProductDetail from '../../features/products/hooks/useProductDetail';

const ProductDetailPage = ({ productId, onBack, onAddToCart }) => {
    const productDetail = useProductDetail(productId);

    return (
        <ProductDetail
            product={productDetail.product}
            loading={productDetail.loading}
            onBack={onBack}
            onAddToCart={onAddToCart}
        />
    );
};

export default ProductDetailPage;
