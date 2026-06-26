import React from 'react';
import customerService from '../../services/customerService';

const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
};

const RegisterPage = () => {
    const [form, setForm] = React.useState(initialForm);
    const [message, setMessage] = React.useState(null);
    const [submitting, setSubmitting] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(null);

        if (form.password !== form.confirmPassword) {
            setMessage({ type: 'danger', text: 'Mật khẩu xác nhận không khớp.' });
            return;
        }

        try {
            setSubmitting(true);
            await customerService.register({
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                address: form.address,
                password: form.password
            });
            setForm(initialForm);
            setMessage({ type: 'success', text: 'Đăng ký khách hàng thành công.' });
        } catch (error) {
            const apiMessage = error?.response?.data?.message;
            setMessage({ type: 'danger', text: apiMessage || 'Không thể đăng ký. Vui lòng thử lại.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="container page-section">
            <div className="page-title">
                <p className="section-kicker">CustomerRegister</p>
                <h1>Đăng ký khách hàng</h1>
                <span>Tạo tài khoản khách hàng bằng Email chưa tồn tại trong hệ thống.</span>
            </div>

            {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Họ tên</label>
                        <input name="fullName" className="form-control" value={form.fullName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input name="address" className="form-control" value={form.address} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nhập lại mật khẩu</label>
                        <input name="confirmPassword" type="password" className="form-control" value={form.confirmPassword} onChange={handleChange} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                    {submitting ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
            </form>
        </section>
    );
};

export default RegisterPage;
