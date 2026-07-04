import React from 'react';
import HeroBanner from '../../components/public/home/HeroBanner';
import CategoryGrid from '../../components/public/home/CategoryGrid';
import FeaturedProducts from '../../components/public/home/FeaturedProducts';
import LatestProducts from '../../components/public/home/LatestProducts';
import HotProducts from '../../components/public/home/HotProducts';
import PostList from '../../components/public/news/PostList';
import useProductCategories from '../../hooks/useProductCategories';
import useProducts from '../../hooks/useProducts';
import usePosts from '../../hooks/usePosts';
import useBanners from '../../hooks/useBanners';
import { brand } from '../../config/theme';

const HomePage = ({ selectedCategoryId, onSelectCategory, onNavigate, onViewProduct, onViewPost, onBuyNow }) => {
    const productCategories = useProductCategories();
    const featuredProducts = useProducts({ categoryId: selectedCategoryId, limit: 8 });
    const latestPosts = usePosts({ limit: 3 });
    const banners = useBanners();

    const handleSelectCategory = (categoryId) => {
        onSelectCategory(categoryId);
        window.requestAnimationFrame(() => {
            document.getElementById('featured-products')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    return (
        <>
            <HeroBanner
                brand={brand}
                banners={banners.banners}
                products={featuredProducts.products}
                posts={latestPosts.posts}
                onNavigate={onNavigate}
                onViewProduct={onViewProduct}
                onViewPost={onViewPost}
            />

            <div className="container">
                <CategoryGrid
                    categories={productCategories.categories}
                    loading={productCategories.loading}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={handleSelectCategory}
                />

                <FeaturedProducts
                    products={featuredProducts.products}
                    loading={featuredProducts.loading}
                    heading="Kính mắt nổi bật"
                    intro="8 mẫu kính mới và đáng chú ý trong cửa hàng."
                    onViewDetail={onViewProduct}
                    onBuyNow={onBuyNow}
                    sectionId="featured-products"
                />

                <LatestProducts
                    onViewDetail={onViewProduct}
                    onBuyNow={onBuyNow}
                    sectionId="latest-products"
                />

                <HotProducts
                    onViewDetail={onViewProduct}
                    onBuyNow={onBuyNow}
                    sectionId="hot-products"
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
