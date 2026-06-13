import React from 'react';
import { brand } from '../../config/theme';
import useContactForm from '../../hooks/useContactForm';

const ContactPage = () => {
    const { sent, handleSubmit } = useContactForm();

    return (
        <section className="contact-page">
            <div className="container contact-grid">
                <div className="contact-copy">
                    <p className="section-kicker">Liên hệ</p>
                    <h1>Gửi thông tin cho {brand.name}{brand.suffix}</h1>
                    <p>
                        Điền thông tin bên dưới để shop tư vấn sản phẩm, hỗ trợ đơn hàng hoặc tiếp nhận góp ý.
                    </p>
                    <div className="contact-info">
                        <a href={`mailto:${brand.email}`}>{brand.email}</a>
                        <a href={`tel:${brand.phone.replaceAll(' ', '')}`}>{brand.phone}</a>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input className="form-control" name="fullName" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input className="form-control" name="phone" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" name="email" type="email" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <textarea className="form-control" name="message" rows="5" required />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Gửi liên hệ</button>
                    {sent && <div className="alert alert-success mt-3 mb-0">Thông tin liên hệ đã được ghi nhận.</div>}
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
