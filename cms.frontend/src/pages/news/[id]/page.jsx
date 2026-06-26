import React from 'react';
import PostDetail from '../../../components/public/news/PostDetail';
import usePostDetail from '../../../hooks/usePostDetail';

const PostDetailPage = ({ postId, onBack }) => {
    const postDetail = usePostDetail(postId);

    return (
        <PostDetail
            post={postDetail.post}
            loading={postDetail.loading}
            error={postDetail.error}
            onBack={onBack}
        />
    );
};

export default PostDetailPage;
