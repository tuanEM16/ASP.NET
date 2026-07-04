import React from 'react';
import { LogIn } from 'lucide-react';
import customerService from '../../services/customerService';

const LoginPage = ({ onLogin, onRegister, onForgotPassword }) => {
    const [form, setForm] = React.useState({ email: '', password: '' });
    const [message, setMessage] = React.useState(null);
    const [submitting, setSubmitting] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);

        try {
            setSubmitting(true);
            const response = await customerService.login({
                email: form.email,
                password: form.password
            });
            onLogin(response.customer);
        } catch (error) {
            setMessage({
                type: 'danger',
                text: error?.response?.data?.message || 'Không thể đăng nhập. Vui lòng thử lại.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="container page-section auth-page">
            <div className="page-title">
                <div>
                    <p className="section-kicker">Customer Login</p>
                    <h1>Đăng nhập khách hàng</h1>
                    <span>Đăng nhập để sử dụng thông tin giao hàng đã lưu.</span>
                </div>
            </div>

            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <h2>Thông tin đăng nhập</h2>
                    <p>Sử dụng Email và mật khẩu đã đăng ký tại EyeStyle.Store.</p>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
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
                    <label className="form-label" htmlFor="login-password">Mật khẩu</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        className="form-control"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                    <LogIn size={18} />
                    {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
                <div className="auth-links">
                    <button type="button" className="btn btn-link" onClick={onForgotPassword}>
                        Quên mật khẩu?
                    </button>
                    <button type="button" className="btn btn-link" onClick={onRegister}>
                        Chưa có tài khoản? Đăng ký
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
