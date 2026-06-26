import React from 'react';
import { brand } from '../../config/theme';

const Footer = ({ onNavigate }) => (
    <footer className="site-footer">
        <div className="container footer-grid">
            <div>
                <strong>{brand.name}{brand.suffix}</strong>
                <p>Trang thời trang </p>
            </div>
            <div>
                <span>Danh mục</span>
                <button type="button" onClick={() => onNavigate('products')}>Sản phẩm</button>
                <button type="button" onClick={() => onNavigate('news')}>Tin tức</button>
            </div>
            <div>
                <span>Liên hệ</span>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
                <a href={`tel:${brand.phone.replaceAll(' ', '')}`}>{brand.phone}</a>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">© 2026 {brand.name}{brand.suffix}. All rights reserved.</div>
        </div>
    </footer>
);

export default Footer;
