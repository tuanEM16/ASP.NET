import React from 'react';
import {
    CheckCircle2,
    MapPin,
    ReceiptText,
    ShieldCheck,
    ShoppingBag,
    Trash2,
    Truck
} from 'lucide-react';
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
    const [orderId, setOrderId] = React.useState(null);

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
            setOrderId(response.orderId);
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
            <div className="page-title checkout-page-title">
                <div>
                    <p className="section-kicker">Thanh toán</p>
                    <h1>Hoàn tất đơn hàng</h1>
                    <span>Kiểm tra sản phẩm và nhập thông tin giao hàng.</span>
                </div>
                <div className="checkout-steps" aria-label="Các bước đặt hàng">
                    <span className="active"><ShoppingBag size={17} />Giỏ hàng</span>
                    <span className="active"><MapPin size={17} />Giao hàng</span>
                    <span><CheckCircle2 size={17} />Hoàn tất</span>
                </div>
            </div>

            {orderId ? (
                <div className="order-success">
                    <CheckCircle2 size={52} />
                    <p className="section-kicker">Đặt hàng thành công</p>
                    <h2>Cảm ơn bạn đã mua hàng</h2>
                    <p>Đơn hàng <strong>#{orderId}</strong> đã được ghi nhận. Shop sẽ liên hệ xác nhận trong thời gian sớm nhất.</p>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={onNavigateProducts}>
                            Tiếp tục mua sắm
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setOrderId(null)}>
                            Quay lại giỏ hàng
                        </button>
                    </div>
                </div>
            ) : cart.items.length === 0 ? (
                <div className="cart-empty">
                    <ShoppingBag size={48} />
                    <h2>Giỏ hàng đang trống</h2>
                    <p>Khám phá các mẫu kính mới và thêm sản phẩm bạn yêu thích.</p>
                    <button type="button" className="btn btn-primary" onClick={onNavigateProducts}>
                        Xem sản phẩm
                    </button>
                </div>
            ) : (
                <>
                    {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

                    <div className="cart-layout">
                        <div className="checkout-products">
                            <div className="checkout-section-heading">
                                <div>
                                    <ShoppingBag size={20} />
                                    <h2>Sản phẩm đã chọn</h2>
                                </div>
                                <button type="button" onClick={onNavigateProducts}>Thêm sản phẩm</button>
                            </div>
                            <CartTable items={cart.items} cart={cart} />
                            <button type="button" className="clear-cart-button" onClick={cart.clearCart}>
                                <Trash2 size={16} />
                                Xóa toàn bộ giỏ hàng
                            </button>
                        </div>

                        <aside className="checkout-panel">
                            <div className="checkout-section-heading">
                                <div>
                                    <MapPin size={20} />
                                    <h2>Thông tin giao hàng</h2>
                                </div>
                            </div>

                            <form className="checkout-form" onSubmit={handleSubmit}>
                                <div className="checkout-form-row">
                                    <label className="form-label">
                                        Họ và tên <span>*</span>
                                        <input
                                            name="fullName"
                                            className="form-control"
                                            autoComplete="name"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label className="form-label">
                                        Số điện thoại <span>*</span>
                                        <input
                                            name="phone"
                                            type="tel"
                                            className="form-control"
                                            autoComplete="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                </div>
                                <label className="form-label">
                                    Địa chỉ nhận hàng <span>*</span>
                                    <input
                                        name="address"
                                        className="form-control"
                                        autoComplete="street-address"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="form-label">
                                    Email nhận xác nhận
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="form-label">
                                    Ghi chú đơn hàng
                                    <textarea
                                        name="notes"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Màu sắc, thời gian nhận hàng..."
                                        value={form.notes}
                                        onChange={handleChange}
                                    />
                                </label>

                                <div className="order-summary">
                                    <div><span>Số lượng sản phẩm</span><strong>{cart.totalQuantity}</strong></div>
                                    <div><span>Phí giao hàng</span><strong>Miễn phí</strong></div>
                                    <div className="order-total">
                                        <span>Tổng thanh toán</span>
                                        <strong>{formatCurrency(cart.totalAmount)}</strong>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success w-100 checkout-submit" disabled={submitting}>
                                    <ReceiptText size={19} />
                                    {submitting ? 'Đang tạo đơn hàng...' : 'Xác nhận đặt hàng'}
                                </button>
                            </form>

                            <div className="checkout-assurances">
                                <span><ShieldCheck size={17} />Thông tin được bảo mật</span>
                                <span><Truck size={17} />Giao hàng toàn quốc</span>
                            </div>
                        </aside>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
