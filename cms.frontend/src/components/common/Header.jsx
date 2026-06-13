import React from 'react';
import logo from '../../assets/images/logo.png';
import { brand } from '../../config/theme';

const Header = ({ currentPage, navItems, cartCount, onNavigate }) => (
    <header className="site-header">
        <div className="container header-inner">
            <button type="button" className="brand-button" onClick={() => onNavigate('home')}>
                <img src={logo} alt={`${brand.name}${brand.suffix}`} className="brand-logo" />
                <span className="brand-text">
                    {brand.name}<span>{brand.suffix}</span>
                </span>
            </button>
            <nav className="main-nav" aria-label="Điều hướng chính">
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        className={currentPage === item.key ? 'active' : ''}
                        onClick={() => onNavigate(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
                <button
                    type="button"
                    className={`cart-nav-button ${currentPage === 'cart' ? 'active' : ''}`}
                    onClick={() => onNavigate('cart')}
                >
                    Giỏ hàng
                    {cartCount > 0 && <span>{cartCount}</span>}
                </button>
            </nav>
        </div>
    </header>
);

export default Header;
