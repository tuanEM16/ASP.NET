import React from 'react';
import CategoryProductList from './components/CategoryProductList';
import BlogCategoryList from './components/BlogCategoryList';
import ProductList from './components/ProductList';
import PostList from './components/PostList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const navItems = [
    { key: 'home', label: 'Trang chủ' },
    { key: 'products', label: 'Sản phẩm' },
    { key: 'news', label: 'Tin tức' },
    { key: 'contact', label: 'Liên hệ' }
];

function App() {
    const [currentPage, setCurrentPage] = React.useState('home');
    const [selectedProductCategoryId, setSelectedProductCategoryId] = React.useState(null);
    const [selectedBlogCategoryId, setSelectedBlogCategoryId] = React.useState(null);
    const [contactSent, setContactSent] = React.useState(false);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleContactSubmit = (event) => {
        event.preventDefault();
        setContactSent(true);
        event.currentTarget.reset();
    };

    const renderHome = () => (
        <>
            <section className="hero-section">
                <div className="container hero-inner">
                    <div>
                        <p className="hero-kicker">EmCMS.Fashion</p>
                        <h1>Thời trang hiện đại cho phong cách mỗi ngày</h1>
                        <p>
                            Khám phá sản phẩm nổi bật và các xu hướng mới nhất được cập nhật từ hệ thống quản trị EmCMS.
                        </p>
                        <div className="hero-actions">
                            <button type="button" className="btn btn-primary" onClick={() => goToPage('products')}>
                                Xem sản phẩm
                            </button>
                            <button type="button" className="btn btn-outline-dark" onClick={() => goToPage('news')}>
                                Đọc tin tức
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <ProductList
                    selectedCategoryId={null}
                    limit={8}
                    heading="Sản phẩm nổi bật"
                    intro="8 sản phẩm mới và đáng chú ý trong shop."
                />

                <PostList
                    categoryId={null}
                    limit={3}
                    heading="Bài viết mới nhất"
                    intro="3 bài viết mới nhất từ chuyên mục tin tức."
                />
            </div>
        </>
    );

    const renderProducts = () => (
        <div className="container page-section">
            <div className="page-title">
                <p className="section-kicker">Shop</p>
                <h1>Tất cả sản phẩm</h1>
                <span>Lọc theo danh mục để xem đúng nhóm sản phẩm bạn cần.</span>
            </div>
            <CategoryProductList
                selectedCategoryId={selectedProductCategoryId}
                onSelectCategory={setSelectedProductCategoryId}
            />
            <ProductList
                selectedCategoryId={selectedProductCategoryId}
                heading="Danh sách sản phẩm"
                intro="Toàn bộ sản phẩm đang có trong shop."
            />
        </div>
    );

    const renderNews = () => (
        <div className="container page-section">
            <div className="page-title">
                <p className="section-kicker">Blog</p>
                <h1>Bài viết mới nhất</h1>
                <span>Lọc theo danh mục để xem đúng nhóm bài viết bạn cần.</span>
            </div>
            <BlogCategoryList
                selectedCategoryId={selectedBlogCategoryId}
                onSelectCategory={setSelectedBlogCategoryId}
            />
            <PostList
                categoryId={selectedBlogCategoryId}
                heading="Tất cả bài viết"
                intro="Tin tức, mẹo phối đồ và các nội dung mới được cập nhật."
            />
        </div>
    );

    const renderContact = () => (
        <section className="contact-page">
            <div className="container contact-grid">
                <div className="contact-copy">
                    <p className="section-kicker">Liên hệ</p>
                    <h1>Gửi thông tin cho EmCMS.Fashion</h1>
                    <p>
                        Điền thông tin bên dưới để shop tư vấn sản phẩm, hỗ trợ đơn hàng hoặc tiếp nhận góp ý.
                    </p>
                    <div className="contact-info">
                        <a href="mailto:contact@emcms.local">contact@emcms.local</a>
                        <a href="tel:0900000000">0900 000 000</a>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input className="form-control" name="fullName" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input className="form-control" name="phone" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" name="email" type="email" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nội dung</label>
                        <textarea className="form-control" name="message" rows="5" required />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Gửi liên hệ</button>
                    {contactSent && <div className="alert alert-success mt-3 mb-0">Thông tin liên hệ đã được ghi nhận.</div>}
                </form>
            </div>
        </section>
    );

    const renderPage = () => {
        if (currentPage === 'products') return renderProducts();
        if (currentPage === 'news') return renderNews();
        if (currentPage === 'contact') return renderContact();
        return renderHome();
    };

    return (
        <div className="site-shell">
            <header className="site-header">
                <div className="container header-inner">
                    <button type="button" className="brand-button" onClick={() => goToPage('home')}>
                        EmCMS<span>.Fashion</span>
                    </button>
                    <nav className="main-nav" aria-label="Điều hướng chính">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                className={currentPage === item.key ? 'active' : ''}
                                onClick={() => goToPage(item.key)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            <main>{renderPage()}</main>

            <footer className="site-footer">
                <div className="container footer-grid">
                    <div>
                        <strong>EmCMS.Fashion</strong>
                        <p>Trang thời trang demo kết nối ASP.NET Core Web API và ReactJS.</p>
                    </div>
                    <div>
                        <span>Danh mục</span>
                        <button type="button" onClick={() => goToPage('products')}>Sản phẩm</button>
                        <button type="button" onClick={() => goToPage('news')}>Tin tức</button>
                    </div>
                    <div>
                        <span>Liên hệ</span>
                        <a href="mailto:contact@emcms.local">contact@emcms.local</a>
                        <a href="tel:0900000000">0900 000 000</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">© 2026 EmCMS.Fashion. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

export default App;
