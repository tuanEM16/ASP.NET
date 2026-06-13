import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { navItems } from '../routes';

const MainLayout = ({ currentPage, cartCount, onNavigate, children }) => (
    <div className="site-shell">
        <Header currentPage={currentPage} navItems={navItems} cartCount={cartCount} onNavigate={onNavigate} />
        <main>{children}</main>
        <Footer onNavigate={onNavigate} />
    </div>
);

export default MainLayout;
