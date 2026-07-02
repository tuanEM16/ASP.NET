import React from 'react';
import { ArrowLeft, PackageCheck, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { getContentHtml, getImageUrl } from '../../../utils/images';
import logo from '../../../assets/images/logo.png';

const ProductDetail = ({ product, loading, onBack, onAddToCart }) => {
    const [quantity, setQuantity] = React.useState(1);

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
    const stockQuantity = Number(product.stockQuantity ?? 0);
    const descriptionHtml = getContentHtml(product.description)
        || 'Mô tả sản phẩm đang được cập nhật.';

    const handleAddToCart = () => {
        if (quantity > stockQuantity) {
            window.alert('Số lượng sản phẩm trong kho không đủ!');
            return;
        }

        onAddToCart(product, quantity);
    };

    return (
        <section className="container detail-page">
            <button type="button" className="back-button" onClick={onBack}>
                <ArrowLeft size={18} />
                Quay lại sản phẩm
            </button>

            <div className="detail-card product-detail-card">
                <div className="product-detail-media">
                    <img src={imageUrl || logo} alt={product.name} className="detail-image" />
                </div>
                <div className="detail-body">
                    <p className="section-kicker">Kính mắt thời trang</p>
                    <h1>{product.name}</h1>
                    <p className="product-price fs-4">{formatCurrency(product.price)}</p>
                    <p className={`detail-stock ${stockQuantity > 0 ? 'in-stock' : 'out-stock'}`}>
                        <PackageCheck size={18} />
                        {stockQuantity > 0 ? `Còn ${stockQuantity} sản phẩm` : 'Tạm hết hàng'}
                    </p>
                    <div
                        className="detail-content"
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                    <div className="detail-quantity">
                        <label htmlFor="product-quantity">Số lượng</label>
                        <input
                            id="product-quantity"
                            type="number"
                            min="1"
                            max={Math.max(1, stockQuantity)}
                            value={quantity}
                            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        disabled={stockQuantity <= 0}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={18} />
                        Thêm vào giỏ hàng
                    </button>
                    <div className="product-assurances">
                        <span><ShieldCheck size={18} />Cam kết chính hãng</span>
                        <span><Truck size={18} />Giao hàng toàn quốc</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
