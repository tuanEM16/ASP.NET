import React from 'react';
import customerService from '../../services/customerService';

const ForgotPasswordPage = ({ onBack }) => {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            setSubmitting(true);
            const response = await customerService.forgotPassword(email);
            setMessage(response.message);
        } catch (error) {
            setMessage(error?.response?.data?.message || 'Không thể gửi yêu cầu. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="container page-section auth-page">
            <div className="page-title">
                <div>
                    <p className="section-kicker">Customer</p>
                    <h1>Quên mật khẩu</h1>
                    <span>Nhập Email đã đăng ký để nhận liên kết đặt lại mật khẩu.</span>
                </div>
            </div>

            {message && <div className="alert alert-info">{message}</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <h2>Khôi phục tài khoản</h2>
                    <p>Liên kết đặt lại mật khẩu sẽ có hiệu lực trong 30 phút.</p>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="forgot-email">Email</label>
                    <input
                        id="forgot-email"
                        type="email"
                        className="form-control"
                        autoComplete="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                    {submitting ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'}
                </button>
                <button type="button" className="btn btn-link w-100 mt-2" onClick={onBack}>
                    Quay lại đăng ký
                </button>
            </form>
        </section>
    );
};

export default ForgotPasswordPage;
