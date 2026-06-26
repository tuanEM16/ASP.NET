import React from 'react';
import ProductDetail from '../../../components/public/product/ProductDetail';
import useProductDetail from '../../../hooks/useProductDetail';

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
