import React from 'react';
import BlogCategoryList from '../../components/public/news/BlogCategoryList';
import PostList from '../../components/public/news/PostList';
import useBlogCategories from '../../hooks/useBlogCategories';
import usePosts from '../../hooks/usePosts';

const NewsPage = ({ selectedCategoryId, onSelectCategory, onViewPost }) => {
    const blogCategories = useBlogCategories();
    const postList = usePosts({ categoryId: selectedCategoryId });

    return (
        <div className="container page-section">
            <div className="page-title">
                <p className="section-kicker">Blog</p>
                <h1>Bài viết mới nhất</h1>
                <span>Lọc theo danh mục để xem đúng nhóm bài viết bạn cần.</span>
            </div>
            <BlogCategoryList
                categories={blogCategories.categories}
                loading={blogCategories.loading}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={onSelectCategory}
            />
            <PostList
                posts={postList.posts}
                loading={postList.loading}
                heading="Tất cả bài viết"
                intro="Tin tức, mẹo phối đồ và các nội dung mới được cập nhật."
                onViewDetail={onViewPost}
            />
        </div>
    );
};

export default NewsPage;
