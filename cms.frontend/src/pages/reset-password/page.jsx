import React from 'react';
import customerService from '../../services/customerService';

const ResetPasswordPage = ({ onNavigateHome }) => {
    const query = React.useMemo(() => new URLSearchParams(window.location.search), []);
    const [form, setForm] = React.useState({
        email: query.get('email') || '',
        token: query.get('token') || '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = React.useState(null);
    const [submitting, setSubmitting] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);

        if (form.newPassword !== form.confirmPassword) {
            setMessage({ type: 'danger', text: 'Mật khẩu xác nhận không khớp.' });
            return;
        }

        try {
            setSubmitting(true);
            const response = await customerService.resetPassword({
                email: form.email,
                token: form.token,
                newPassword: form.newPassword
            });
            setMessage({ type: 'success', text: response.message });
        } catch (error) {
            setMessage({
                type: 'danger',
                text: error?.response?.data?.message || 'Không thể đặt lại mật khẩu.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="container page-section auth-page">
            <div className="page-title">
                <div>
                    <p className="section-kicker">Customer</p>
                    <h1>Đặt lại mật khẩu</h1>
                    <span>Liên kết đặt lại mật khẩu có hiệu lực trong 30 phút.</span>
                </div>
            </div>

            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <h2>Tạo mật khẩu mới</h2>
                    <p>Mật khẩu nên có ít nhất 6 ký tự và không trùng mật khẩu cũ.</p>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="reset-email">Email</label>
                    <input
                        id="reset-email"
                        name="email"
                        type="email"
                        className="form-control"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="reset-token">Token</label>
                    <input
                        id="reset-token"
                        name="token"
                        className="form-control"
                        autoComplete="one-time-code"
                        value={form.token}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="new-password">Mật khẩu mới</label>
                    <input
                        id="new-password"
                        name="newPassword"
                        type="password"
                        className="form-control"
                        minLength="6"
                        autoComplete="new-password"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="confirm-new-password">Nhập lại mật khẩu</label>
                    <input
                        id="confirm-new-password"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        minLength="6"
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                    {submitting ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
                </button>
                <button type="button" className="btn btn-link w-100 mt-2" onClick={onNavigateHome}>
                    Về trang chủ
                </button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;
