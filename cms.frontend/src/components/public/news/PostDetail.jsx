import React from 'react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { formatDate } from '../../../utils/formatters';
import { getContentHtml, getImageUrl } from '../../../utils/images';

const PostDetail = ({ post, loading, error, onBack }) => {
    if (loading) {
        return <div className="container page-section text-center">Đang tải chi tiết bài viết...</div>;
    }

    if (error || !post) {
        return (
            <div className="container page-section">
                <div className="alert alert-warning">{error || 'Không tìm thấy bài viết.'}</div>
                <button type="button" className="btn btn-secondary" onClick={onBack}>Quay lại tin tức</button>
            </div>
        );
    }

    const imageUrl = getImageUrl(post.imageUrl);
    const contentHtml = getContentHtml(post.content)
        || 'Nội dung bài viết đang được cập nhật.';

    return (
        <article className="container detail-page">
            <button type="button" className="back-button" onClick={onBack}>
                <ArrowLeft size={18} />
                Quay lại tin tức
            </button>

            <div className="detail-card">
                {imageUrl && <img src={imageUrl} alt={post.title} className="detail-image" />}
                <div className="detail-body">
                    <p className="section-kicker">Bài viết</p>
                    <h1>{post.title}</h1>
                    <p className="detail-meta"><CalendarDays size={17} />Ngày đăng: {formatDate(post.createdDate)}</p>
                    <div
                        className="detail-content"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>
            </div>
        </article>
    );
};

export default PostDetail;
