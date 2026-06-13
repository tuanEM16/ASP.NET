import { useEffect, useState } from 'react';
import postService from '../services/postService';

const usePostDetail = (postId) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError('');
                const data = await postService.getPostById(postId);
                setPost(data || null);
            } catch (err) {
                console.error('Lỗi tải chi tiết bài viết:', err);
                setPost(null);
                setError('Không thể tải chi tiết bài viết.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    return {
        post,
        loading,
        error
    };
};

export default usePostDetail;
