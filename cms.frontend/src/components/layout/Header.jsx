import React from 'react';
import {
    Home,
    Menu,
    Newspaper,
    Phone,
    Search,
    ShoppingBag,
    UserPlus,
    X
} from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { brand } from '../../config/theme';
import useDebouncedValue from '../../hooks/useDebouncedValue';

const navIcons = {
    home: Home,
    products: ShoppingBag,
    news: Newspaper,
    contact: Phone,
    register: UserPlus
};

const Header = ({ currentPage, navItems, cartCount, onNavigate, onSearch }) => {
    const [keyword, setKeyword] = React.useState('');
    const [menuOpen, setMenuOpen] = React.useState(false);
    const hasSearched = React.useRef(false);
    const debouncedKeyword = useDebouncedValue(keyword.trim(), 500);

    React.useEffect(() => {
        if (debouncedKeyword) {
            hasSearched.current = true;
            onSearch(debouncedKeyword);
        } else if (hasSearched.current) {
            onSearch('');
        }
    }, [debouncedKeyword, onSearch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            onSearch(keyword.trim());
            setMenuOpen(false);
        }
    };

    const handleNavigate = (page) => {
        onNavigate(page);
        setMenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="container header-inner">
                <button type="button" className="brand-button" onClick={() => handleNavigate('home')}>
                    <img src={logo} alt={`${brand.name}${brand.suffix}`} className="brand-logo" />
                    <span className="brand-text">
                        {brand.name}<span>{brand.suffix}</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="mobile-menu-button"
                    aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((current) => !current)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                <form className="header-search" onSubmit={handleSubmit}>
                    <label className="visually-hidden" htmlFor="header-search">Tìm sản phẩm</label>
                    <input
                        id="header-search"
                        type="search"
                        value={keyword}
                        placeholder="Tìm kính mắt..."
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                    <button type="submit" title="Tìm sản phẩm" aria-label="Tìm sản phẩm">
                        <Search size={19} />
                    </button>
                </form>

                <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Điều hướng chính">
                    {navItems.map((item) => {
                        const Icon = navIcons[item.key];

                        return (
                            <button
                                key={item.key}
                                type="button"
                                className={currentPage === item.key ? 'active' : ''}
                                onClick={() => handleNavigate(item.key)}
                            >
                                {Icon && <Icon size={16} />}
                                {item.label}
                            </button>
                        );
                    })}
                    <button
                        type="button"
                        className={`cart-nav-button ${currentPage === 'cart' ? 'active' : ''}`}
                        onClick={() => handleNavigate('cart')}
                    >
                        <ShoppingBag size={17} />
                        Giỏ hàng
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
