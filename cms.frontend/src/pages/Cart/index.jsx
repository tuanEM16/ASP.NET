import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import { getImageUrl } from '../../utils/images';

const CartPage = ({ cart, onNavigateProducts, onCheckout }) => (
    <div className="container page-section">
        <div className="page-title">
            <p className="section-kicker">Giỏ hàng</p>
            <h1>Giỏ hàng của bạn</h1>

        </div>

        {cart.items.length === 0 ? (
            <div className="cart-empty">
                <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                <button type="button" className="btn btn-primary" onClick={onNavigateProducts}>
                    Xem sản phẩm
                </button>
            </div>
        ) : (
            <div className="cart-layout">
                <div className="cart-list">
                    {cart.items.map((item) => {
                        const imageUrl = getImageUrl(item.imageUrl);

                        return (
                            <article className="cart-item" key={item.id}>
                                {imageUrl && <img src={imageUrl} alt={item.name} className="cart-image" />}
                                <div className="cart-info">
                                    <h2>{item.name}</h2>
                                    <p>{item.description || 'Sản phẩm đang cập nhật mô tả.'}</p>
                                    <strong>{formatCurrency(item.price)}</strong>
                                </div>
                                <div className="cart-quantity" aria-label={`Số lượng ${item.name}`}>
                                    <button type="button" onClick={() => cart.decreaseQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button type="button" onClick={() => cart.addToCart(item)}>+</button>
                                </div>
                                <div className="cart-line-total">{formatCurrency((item.price || 0) * item.quantity)}</div>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => cart.removeFromCart(item.id)}
                                >
                                    Xóa
                                </button>
                            </article>
                        );
                    })}
                </div>

                <aside className="cart-summary">
                    <h2>Tóm tắt</h2>
                    <div>
                        <span>Số lượng</span>
                        <strong>{cart.totalQuantity}</strong>
                    </div>
                    <div>
                        <span>Tổng tiền</span>
                        <strong>{formatCurrency(cart.totalAmount)}</strong>
                    </div>
                    <button type="button" className="btn btn-success w-100" onClick={onCheckout}>
                        Tiếp tục liên hệ
                    </button>
                    <button type="button" className="btn btn-outline-secondary w-100" onClick={cart.clearCart}>
                        Xóa giỏ hàng
                    </button>
                </aside>
            </div>
        )}
    </div>
);

export default CartPage;
