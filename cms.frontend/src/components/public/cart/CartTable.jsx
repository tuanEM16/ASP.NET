import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { getImageUrl } from '../../../utils/images';
import logo from '../../../assets/images/logo.png';

const CartTable = ({ items = [], cart }) => (
    <div className="cart-list">
        <div className="cart-list-heading">
            <span>Sản phẩm</span>
            <span>Thành tiền</span>
        </div>
        {items.map((item) => {
            const imageUrl = getImageUrl(item.imageUrl) || logo;

            return (
                <article className="cart-item" key={item.id}>
                    <img src={imageUrl} alt={item.name} className="cart-image" />
                    <div className="cart-info">
                        <h2>{item.name}</h2>
                        <p>Còn {item.stockQuantity ?? 0} sản phẩm trong kho</p>
                        <strong>{formatCurrency(item.price)}</strong>
                    </div>
                    <div className="cart-quantity" aria-label={`Số lượng ${item.name}`}>
                        <button
                            type="button"
                            title="Giảm số lượng"
                            aria-label="Giảm số lượng"
                            onClick={() => cart.decreaseQuantity(item.id)}
                        >
                            <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            type="button"
                            title="Tăng số lượng"
                            aria-label="Tăng số lượng"
                            onClick={() => cart.addToCart(item)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="cart-line-total">{formatCurrency((item.price || 0) * item.quantity)}</div>
                    <button
                        type="button"
                        className="cart-remove"
                        title="Xóa sản phẩm"
                        aria-label={`Xóa ${item.name}`}
                        onClick={() => cart.removeFromCart(item.id)}
                    >
                        <Trash2 size={18} />
                    </button>
                </article>
            );
        })}
    </div>
);

export default CartTable;
