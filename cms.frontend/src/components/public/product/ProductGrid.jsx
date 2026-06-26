import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { getImageUrl } from '../../../utils/images';

const ProductGrid = ({ products = [], loading, heading = 'Sản phẩm nổi bật', intro, onViewDetail, onBuyNow }) => {
    if (loading) {
        return <div className="text-center my-4">Đang tải danh sách kính mắt thời trang...</div>;
    }

    return (
        <section id="san-pham" className="home-section">
            <div className="section-heading">
                <div>
                    <p className="section-kicker">Bộ sưu tập kính</p>
                    <h2>{heading}</h2>
                    {intro && <span className="section-muted">{intro}</span>}
                </div>
            </div>

            {products.length === 0 ? (
                <p className="text-muted">Chưa có sản phẩm nào trong hệ thống.</p>
            ) : (
                <div className="row">
                    {products.map((item) => {
                        const imageUrl = getImageUrl(item.imageUrl);

                        return (
                            <div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
                                <article className="product-card h-100">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            className="product-image"
                                            alt={item.name}
                                        />
                                    )}
                                    <div className="product-body">
                                        <h3>{item.name}</h3>
                                        <p className="product-description">
                                            {item.description || 'Đang cập nhật mô tả sản phẩm.'}
                                        </p>
                                        <p className="product-price">{formatCurrency(item.price)}</p>
                                        <p className="product-stock">Tồn kho: {item.stockQuantity ?? 0} sản phẩm</p>
                                    </div>
                                    <div className="product-actions">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => onViewDetail(item.id)}
                                        >
                                            Chi tiết
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={() => onBuyNow(item)}
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
