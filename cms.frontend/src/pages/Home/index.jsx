import React from 'react';
import CategoryProductList from '../../features/products/components/CategoryProductList';
import ProductList from '../../features/products/components/ProductList';
import PostList from '../../features/posts/components/PostList';
import useProductCategories from '../../features/products/hooks/useProductCategories';
import useProducts from '../../features/products/hooks/useProducts';
import usePosts from '../../features/posts/hooks/usePosts';
import { brand } from '../../config/theme';

const HomePage = ({ selectedCategoryId, onSelectCategory, onNavigate, onViewProduct, onViewPost, onBuyNow }) => {
    const productCategories = useProductCategories();
    const featuredProducts = useProducts({ categoryId: selectedCategoryId, limit: 8 });
    const latestPosts = usePosts({ limit: 3 });

    return (
        <>
            <section className="hero-section">
                <div className="container hero-inner">
                    <div>
                        <p className="hero-kicker">{brand.name}{brand.suffix}</p>
                        <h1>Thời trang hiện đại cho phong cách mỗi ngày</h1>
                        <p>
                            Khám phá sản phẩm nổi bật và các xu hướng mới nhất được cập nhật từ hệ thống quản trị EmCMS.
                        </p>
                        <div className="hero-actions">
                            <button type="button" className="btn btn-primary" onClick={() => onNavigate('products')}>
                                Xem sản phẩm
                            </button>
                            <button type="button" className="btn btn-outline-dark" onClick={() => onNavigate('news')}>
                                Đọc tin tức
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <CategoryProductList
                    categories={productCategories.categories}
                    loading={productCategories.loading}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={onSelectCategory}
                />

                <ProductList
                    products={featuredProducts.products}
                    loading={featuredProducts.loading}
                    heading="Sản phẩm nổi bật"
                    intro="8 sản phẩm mới và đáng chú ý trong shop."
                    onViewDetail={onViewProduct}
                    onBuyNow={onBuyNow}
                />

                <PostList
                    posts={latestPosts.posts}
                    loading={latestPosts.loading}
                    heading="Bài viết mới nhất"
                    intro="3 bài viết mới nhất từ chuyên mục tin tức."
                    onViewDetail={onViewPost}
                />
            </div>
        </>
    );
};

export default HomePage;
