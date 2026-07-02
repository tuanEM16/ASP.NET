import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { navItems } from '../../routes';

const MainLayout = ({ currentPage, cartCount, onNavigate, onSearch, children }) => (
    <div className="site-shell">
        <Header
            currentPage={currentPage}
            navItems={navItems}
            cartCount={cartCount}
            onNavigate={onNavigate}
            onSearch={onSearch}
        />
        <main>{children}</main>
        <Footer onNavigate={onNavigate} />
    </div>
);

export default MainLayout;
