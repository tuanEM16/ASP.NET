import React from 'react';
import { Eye, SearchX, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { getImageUrl } from '../../../utils/images';
import { createSummary } from '../../../utils/text';
import logo from '../../../assets/images/logo.png';

const ProductGrid = ({
    products = [],
    loading,
    heading = 'Sản phẩm nổi bật',
    intro,
    onViewDetail,
    onBuyNow,
    showSoldQuantity = false,
    sectionId = 'san-pham'
}) => {
    if (loading) {
        return <div className="text-center my-4">Đang tải danh sách kính mắt thời trang...</div>;
    }

    return (
        <section id={sectionId} className="home-section product-section">
            <div className="section-heading">
                <div>
                    <p className="section-kicker">Bộ sưu tập kính</p>
                    <h2>{heading}</h2>
                    {intro && <span className="section-muted">{intro}</span>}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="empty-products">
                    <SearchX size={42} />
                    <strong>Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn</strong>
                    <span>Hãy thử thay đổi từ khóa, danh mục hoặc khoảng giá.</span>
                </div>
            ) : (
                <div className="row">
                    {products.map((item) => {
                        const imageUrl = getImageUrl(item.imageUrl);
                        const inStock = Number(item.stockQuantity ?? 0) > 0;

                        return (
                            <div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
                                <article className="product-card h-100">
                                    <div className="product-media">
                                        {showSoldQuantity && (
                                            <span className="product-badge">Bán chạy</span>
                                        )}
                                        <img
                                            src={imageUrl || logo}
                                            className="product-image"
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="product-body">
                                        <span className={`stock-label ${inStock ? 'in-stock' : 'out-stock'}`}>
                                            {inStock ? 'Còn hàng' : 'Hết hàng'}
                                        </span>
                                        <h3>{item.name}</h3>
                                        <p className="product-description">
                                            {createSummary(item.description, 'Đang cập nhật mô tả sản phẩm.')}
                                        </p>
                                        <p className="product-price">{formatCurrency(item.price)}</p>
                                        <p className="product-stock">Tồn kho: {item.stockQuantity ?? 0} sản phẩm</p>
                                        {showSoldQuantity && (
                                            <p className="product-sold">Đã bán: {item.soldQuantity ?? 0} sản phẩm</p>
                                        )}
                                    </div>
                                    <div className="product-actions">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => onViewDetail(item.id)}
                                        >
                                            <Eye size={16} />
                                            Chi tiết
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            disabled={!inStock}
                                            onClick={() => onBuyNow(item)}
                                        >
                                            <ShoppingCart size={16} />
                                            Thêm giỏ
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
