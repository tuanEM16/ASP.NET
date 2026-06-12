import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import blogService from '../services/blogService';

const formatDate = (value) => {
    if (!value) {
        return 'Đang cập nhật';
    }

    return new Date(value).toLocaleDateString('vi-VN');
};

const createSummary = (content, fallback) => {
    if (!content) {
        return fallback || 'Nội dung bài viết sẽ được hiển thị trong trang chi tiết.';
    }

    const plainText = content.replace(/<[^>]+>/g, '').trim();
    return plainText.length > 120 ? `${plainText.substring(0, 120)}...` : plainText;
};

const backendUrl = axiosClient.defaults.baseURL.replace(/\/api\/?$/, '');

const getPostImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    return `${backendUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

const PostList = ({ categoryId, limit, heading = 'Xu hướng thời trang', intro = 'Cập nhật mẹo phối đồ và phong cách mới.' }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = categoryId
                    ? await blogService.getPostsByCategory(categoryId)
                    : await blogService.getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách bài viết:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryId]);

    if (loading) {
        return <div className="text-center my-4">Đang tải tin tức thời trang...</div>;
    }

    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    const visiblePosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;

    return (
        <section id="tin-tuc" className="home-section">
            <div className="section-heading text-center">
                <p className="section-kicker">Góc cảm hứng</p>
                <h2>{heading}</h2>
                {intro && <span className="section-muted">{intro}</span>}
            </div>

            {visiblePosts.length === 0 ? (
                <p className="text-muted">Chưa có bài viết tin tức nào.</p>
            ) : (
                <div className="row">
                    {visiblePosts.map((post) => {
                        const imageUrl = getPostImageUrl(post.imageUrl);

                        return (
                            <div className="col-md-4 mb-4" key={post.id}>
                                <article className="post-card h-100">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            className="post-image"
                                            alt={post.title}
                                        />
                                    )}
                                    <div className="post-body">
                                        <span className="post-date">{formatDate(post.createdDate)}</span>
                                        <h3>{post.title}</h3>
                                        <p>{createSummary(post.content, post.categoryName)}</p>
                                        {post.categoryName && <span className="post-category">{post.categoryName}</span>}
                                        <a href="#tin-tuc" className="post-link">Đọc bài viết</a>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default PostList;
