import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.css';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/home/page';
import ProductPage from './pages/products/page';
import NewsPage from './pages/news/page';
import ContactPage from './pages/contact/page';
import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';
import ForgotPasswordPage from './pages/forgot-password/page';
import ResetPasswordPage from './pages/reset-password/page';
import PostDetailPage from './pages/news/[id]/page';
import ProductDetailPage from './pages/products/[id]/page';
import CartPage from './pages/cart/page';
import NotFoundPage from './pages/not-found/page';
import { pageKeys } from './routes';
import usePageNavigation from './hooks/usePageNavigation';
import useCart from './hooks/useCart';
import useCustomerAuth from './hooks/useCustomerAuth';

function App() {
    const [selectedProductCategoryId, setSelectedProductCategoryId] = React.useState(null);
    const [selectedBlogCategoryId, setSelectedBlogCategoryId] = React.useState(null);
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const cart = useCart();
    const customerAuth = useCustomerAuth();
    const {
        currentPage,
        selectedPostId,
        selectedProductId,
        goToPage,
        showPostDetail,
        showProductDetail
    } = usePageNavigation();

    const addProductToCart = (product, quantity = 1) => {
        cart.addToCart(product, quantity);
        goToPage(pageKeys.cart);
    };

    const handleSearch = React.useCallback((keyword) => {
        const normalizedKeyword = keyword.trim();
        setSearchKeyword(normalizedKeyword);

        if (!normalizedKeyword) {
            return;
        }

        setSelectedProductCategoryId(null);
        goToPage(pageKeys.products);
    }, [goToPage]);

    const renderPage = () => {
        
        if (currentPage === pageKeys.home) {
            return (
                <HomePage
                    selectedCategoryId={selectedProductCategoryId}
                    onSelectCategory={setSelectedProductCategoryId}
                    onNavigate={goToPage}
                    onViewProduct={showProductDetail}
                    onViewPost={showPostDetail}
                    onBuyNow={addProductToCart}
                />
            );
        }

        if (currentPage === pageKeys.products) {
            return (
                <ProductPage
                    selectedCategoryId={selectedProductCategoryId}
                    onSelectCategory={setSelectedProductCategoryId}
                    searchKeyword={searchKeyword}
                    onClearSearch={() => setSearchKeyword('')}
                    onViewProduct={showProductDetail}
                    onBuyNow={addProductToCart}
                />
            );
        }

        if (currentPage === pageKeys.news) {
            return (
                <NewsPage
                    selectedCategoryId={selectedBlogCategoryId}
                    onSelectCategory={setSelectedBlogCategoryId}
                    onViewPost={showPostDetail}
                />
            );
        }

        if (currentPage === pageKeys.contact) {
            return <ContactPage />;
        }

        if (currentPage === pageKeys.login) {
            return (
                <LoginPage
                    onLogin={(customer) => {
                        customerAuth.signIn(customer);
                        goToPage(pageKeys.home);
                    }}
                    onRegister={() => goToPage(pageKeys.register)}
                    onForgotPassword={() => goToPage(pageKeys.forgotPassword)}
                />
            );
        }

        if (currentPage === pageKeys.register) {
            return (
                <RegisterPage
                    onLogin={() => goToPage(pageKeys.login)}
                    onForgotPassword={() => goToPage(pageKeys.forgotPassword)}
                />
            );
        }

        if (currentPage === pageKeys.forgotPassword) {
            return <ForgotPasswordPage onBack={() => goToPage(pageKeys.login)} />;
        }

        if (currentPage === pageKeys.resetPassword) {
            return <ResetPasswordPage onNavigateHome={() => goToPage(pageKeys.home)} />;
        }

        if (currentPage === pageKeys.cart) {
            return (
                <CartPage
                    cart={cart}
                    customer={customerAuth.customer}
                    onNavigateProducts={() => goToPage(pageKeys.products)}
                />
            );
        }

        if (currentPage === pageKeys.postDetail) {
            return <PostDetailPage postId={selectedPostId} onBack={() => goToPage(pageKeys.news)} />;
        }

        if (currentPage === pageKeys.productDetail) {
            return (
                <ProductDetailPage
                    productId={selectedProductId}
                    onBack={() => goToPage(pageKeys.products)}
                    onAddToCart={addProductToCart}
                />
            );
        }

        return <NotFoundPage onNavigateHome={() => goToPage(pageKeys.home)} />;
    };

    return (
        <MainLayout
            currentPage={currentPage}
            cartCount={cart.totalQuantity}
            customer={customerAuth.customer}
            onNavigate={goToPage}
            onSearch={handleSearch}
            onLogout={() => {
                customerAuth.signOut();
                goToPage(pageKeys.home);
            }}
        >
            {renderPage()}
        </MainLayout>
    );
}

export default App;
