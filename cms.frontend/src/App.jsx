import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.css';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/home/page';
import ProductPage from './pages/products/page';
import NewsPage from './pages/news/page';
import ContactPage from './pages/contact/page';
import RegisterPage from './pages/register/page';
import PostDetailPage from './pages/news/[id]/page';
import ProductDetailPage from './pages/products/[id]/page';
import CartPage from './pages/cart/page';
import NotFoundPage from './pages/not-found/page';
import { pageKeys } from './routes';
import usePageNavigation from './hooks/usePageNavigation';
import useCart from './hooks/useCart';

function App() {
    const [selectedProductCategoryId, setSelectedProductCategoryId] = React.useState(null);
    const [selectedBlogCategoryId, setSelectedBlogCategoryId] = React.useState(null);
    const cart = useCart();
    const {
        currentPage,
        selectedPostId,
        selectedProductId,
        goToPage,
        showPostDetail,
        showProductDetail
    } = usePageNavigation();

    const addProductToCart = (product) => {
        cart.addToCart(product);
        goToPage(pageKeys.cart);
    };

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

        if (currentPage === pageKeys.register) {
            return <RegisterPage />;
        }

        if (currentPage === pageKeys.cart) {
            return (
                <CartPage
                    cart={cart}
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
        <MainLayout currentPage={currentPage} cartCount={cart.totalQuantity} onNavigate={goToPage}>
            {renderPage()}
        </MainLayout>
    );
}

export default App;
