import React from 'react';
import { formatDate } from '../../../utils/formatters';
import { getImageUrl } from '../../../utils/images';
import { createSummary } from '../../../utils/text';

const PostList = ({ posts = [], loading, heading = 'Xu hướng thời trang', intro = 'Cập nhật mẹo phối đồ và phong cách mới.', onViewDetail }) => {
    if (loading) {
        return <div className="text-center my-4">Đang tải tin tức thời trang...</div>;
    }

    return (
        <section id="tin-tuc" className="home-section">
            <div className="section-heading text-center">
                <p className="section-kicker">Góc cảm hứng</p>
                <h2>{heading}</h2>
                {intro && <span className="section-muted">{intro}</span>}
            </div>

            {posts.length === 0 ? (
                <p className="text-muted">Chưa có bài viết tin tức nào.</p>
            ) : (
                <div className="row">
                    {posts.map((post) => {
                        const imageUrl = getImageUrl(post.imageUrl);

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
                                        <button type="button" className="post-link" onClick={() => onViewDetail(post.id)}>
                                            Đọc bài viết
                                        </button>
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
