import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import CartTable from '../../components/public/cart/CartTable';
import orderService from '../../services/orderService';

const initialCheckoutForm = {
    fullName: '',
    phone: '',
    address: '',
    email: '',
    notes: ''
};

const CartPage = ({ cart, onNavigateProducts }) => {
    const [form, setForm] = React.useState(initialCheckoutForm);
    const [submitting, setSubmitting] = React.useState(false);
    const [message, setMessage] = React.useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);

        if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
            setMessage({ type: 'danger', text: 'Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ.' });
            return;
        }

        try {
            setSubmitting(true);
            const response = await orderService.createOrder({
                fullName: form.fullName,
                phone: form.phone,
                address: form.address,
                email: form.email,
                notes: form.notes,
                items: cart.items.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            });

            cart.clearCart();
            setForm(initialCheckoutForm);
            setMessage({
                type: 'success',
                text: `Đặt hàng thành công. Mã đơn hàng: #${response.orderId}.`
            });
        } catch (error) {
            const apiMessage = error?.response?.data?.message;
            setMessage({ type: 'danger', text: apiMessage || 'Không thể đặt hàng. Vui lòng kiểm tra Backend API.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container page-section">
            <div className="page-title">
                <p className="section-kicker">Giỏ hàng</p>
                <h1>Giỏ hàng của bạn</h1>
            </div>

            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

            {cart.items.length === 0 ? (
                <div className="cart-empty">
                    <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                    <button type="button" className="btn btn-primary" onClick={onNavigateProducts}>
                        Xem sản phẩm
                    </button>
                </div>
            ) : (
                <div className="cart-layout">
                    <CartTable items={cart.items} cart={cart} />

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

                        <form className="checkout-form" onSubmit={handleSubmit}>
                            <label className="form-label">
                                Họ tên
                                <input name="fullName" className="form-control" value={form.fullName} onChange={handleChange} required />
                            </label>
                            <label className="form-label">
                                Số điện thoại
                                <input name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
                            </label>
                            <label className="form-label">
                                Địa chỉ
                                <input name="address" className="form-control" value={form.address} onChange={handleChange} required />
                            </label>
                            <label className="form-label">
                                Email
                                <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
                            </label>
                            <label className="form-label">
                                Ghi chú
                                <textarea name="notes" className="form-control" rows="3" value={form.notes} onChange={handleChange} />
                            </label>
                            <button type="submit" className="btn btn-success w-100" disabled={submitting}>
                                {submitting ? 'Đang đặt hàng...' : 'Đặt hàng'}
                            </button>
                        </form>

                        <button type="button" className="btn btn-outline-secondary w-100" onClick={cart.clearCart}>
                            Xóa giỏ hàng
                        </button>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default CartPage;
