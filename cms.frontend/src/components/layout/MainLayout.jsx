import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { navItems } from '../../routes';

const MainLayout = ({ currentPage, cartCount, customer, onNavigate, onSearch, onLogout, children }) => (
    <div className="site-shell">
        <Header
            currentPage={currentPage}
            navItems={navItems}
            cartCount={cartCount}
            customer={customer}
            onNavigate={onNavigate}
            onSearch={onSearch}
            onLogout={onLogout}
        />
        <main>{children}</main>
        <Footer onNavigate={onNavigate} />
    </div>
);

export default MainLayout;
