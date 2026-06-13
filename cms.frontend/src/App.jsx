import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/app.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import NewsPage from './pages/News';
import ContactPage from './pages/Contact';
import PostDetailPage from './pages/PostDetail';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import NotFound from './pages/NotFound';
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

    const showContact = () => {
        goToPage(pageKeys.contact);
    };

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
                <ProductsPage
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

        if (currentPage === pageKeys.cart) {
            return (
                <CartPage
                    cart={cart}
                    onNavigateProducts={() => goToPage(pageKeys.products)}
                    onCheckout={showContact}
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

        return <NotFound onNavigateHome={() => goToPage(pageKeys.home)} />;
    };

    return (
        <MainLayout currentPage={currentPage} cartCount={cart.totalQuantity} onNavigate={goToPage}>
            {renderPage()}
        </MainLayout>
    );
}

export default App;
