import React from 'react';
import PostDetail from '../../features/posts/components/PostDetail';
import usePostDetail from '../../features/posts/hooks/usePostDetail';

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
