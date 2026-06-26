import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { getImageUrl } from '../../../utils/images';

const ProductDetail = ({ product, loading, onBack, onAddToCart }) => {
    if (loading) {
        return <div className="container page-section text-center">Đang tải chi tiết sản phẩm...</div>;
    }

    if (!product) {
        return (
            <div className="container page-section">
                <div className="alert alert-warning">Không tìm thấy sản phẩm.</div>
                <button type="button" className="btn btn-secondary" onClick={onBack}>Quay lại sản phẩm</button>
            </div>
        );
    }

    const imageUrl = getImageUrl(product.imageUrl);

    return (
        <section className="container detail-page">
            <button type="button" className="btn btn-outline-secondary mb-4" onClick={onBack}>
                Quay lại sản phẩm
            </button>

            <div className="detail-card product-detail-card">
                {imageUrl && <img src={imageUrl} alt={product.name} className="detail-image" />}
                <div className="detail-body">
                    <p className="section-kicker">Chi tiết sản phẩm</p>
                    <h1>{product.name}</h1>
                    <p className="product-price fs-4">{formatCurrency(product.price)}</p>
                    <p className="detail-meta">Tồn kho: {product.stockQuantity ?? 0} sản phẩm</p>
                    <p className="detail-content">{product.description || 'Mô tả sản phẩm đang được cập nhật.'}</p>
                    <button type="button" className="btn btn-success" onClick={() => onAddToCart(product)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
