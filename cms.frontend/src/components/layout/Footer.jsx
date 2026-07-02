import React from 'react';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { brand } from '../../config/theme';

const Footer = ({ onNavigate }) => (
    <footer className="site-footer">
        <div className="container footer-grid">
            <div className="footer-brand">
                <div>
                    <img src={logo} alt="" />
                    <strong>{brand.name}{brand.suffix}</strong>
                </div>
                <p>Kính mắt thời trang chính hãng, kiểu dáng hiện đại và dịch vụ tư vấn tận tâm.</p>
            </div>
            <div className="footer-links">
                <span>Danh mục</span>
                <button type="button" onClick={() => onNavigate('products')}>Sản phẩm</button>
                <button type="button" onClick={() => onNavigate('news')}>Tin tức</button>
                <button type="button" onClick={() => onNavigate('contact')}>Liên hệ</button>
                <button type="button" onClick={() => onNavigate('forgot-password')}>Quên mật khẩu</button>
            </div>
            <div className="footer-contact">
                <span>Thông tin cửa hàng</span>
                <a href={`mailto:${brand.email}`}><Mail size={16} />{brand.email}</a>
                <a href={`tel:${brand.phone.replaceAll(' ', '')}`}><Phone size={16} />{brand.phone}</a>
                <p><MapPin size={16} />TP. Hồ Chí Minh</p>
                <p><Clock3 size={16} />08:00 - 21:00 mỗi ngày</p>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">© 2026 {brand.name}{brand.suffix}. Website phân phối kính mắt thời trang.</div>
        </div>
    </footer>
);

export default Footer;
