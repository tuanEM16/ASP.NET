import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { getImageUrl } from '../../../utils/images';

const CartTable = ({ items = [], cart }) => (
    <div className="cart-list">
        {items.map((item) => {
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
);

export default CartTable;
