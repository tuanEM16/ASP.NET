import { useEffect, useMemo, useState } from 'react';
import postService from '../services/postService';
import { toArray } from '../../../utils/arrays';

const sortNewestFirst = (posts) => (
    [...posts].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
);

const limitPosts = (posts, limit) => {
    if (!limit) {
        return posts;
    }

    return posts.slice(0, limit);
};

const usePosts = ({ categoryId = null, limit = null } = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = categoryId
                    ? await postService.getPostsByCategory(categoryId)
                    : await postService.getAllPosts();
                setPosts(toArray(data));
            } catch (error) {
                console.error('Lỗi khi tải danh sách bài viết:', error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [categoryId]);

    const visiblePosts = useMemo(() => (
        limitPosts(sortNewestFirst(posts), limit)
    ), [limit, posts]);

    return {
        posts: visiblePosts,
        loading
    };
};

export default usePosts;
