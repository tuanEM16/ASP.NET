import React from 'react';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
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
                        <a href={`mailto:${brand.email}`}><Mail size={18} />{brand.email}</a>
                        <a href={`tel:${brand.phone.replaceAll(' ', '')}`}><Phone size={18} />{brand.phone}</a>
                        <span><MapPin size={18} />TP. Hồ Chí Minh</span>
                        <span><Clock3 size={18} />08:00 - 21:00 mỗi ngày</span>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-heading">
                        <h2>Thông tin liên hệ</h2>
                        <p>Shop sẽ phản hồi trong thời gian sớm nhất.</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input className="form-control" name="fullName" autoComplete="name" placeholder="Nguyễn Văn A" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input className="form-control" name="phone" type="tel" autoComplete="tel" placeholder="0901 234 567" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" name="email" type="email" autoComplete="email" placeholder="email@example.com" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <textarea className="form-control" name="message" rows="5" placeholder="Bạn cần shop hỗ trợ điều gì?" required />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Gửi liên hệ</button>
                    {sent && <div className="alert alert-success mt-3 mb-0">Thông tin liên hệ đã được ghi nhận.</div>}
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
