import { useCallback, useState } from 'react';

const usePageNavigation = () => {
    const queryPage = new URLSearchParams(window.location.search).get('page');
    const [currentPage, setCurrentPage] = useState(
        queryPage === 'reset-password' ? 'reset-password' : 'home'
    );
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const goToPage = useCallback((page) => {
        setCurrentPage(page);
        setSelectedPostId(null);
        setSelectedProductId(null);
        scrollToTop();
    }, [scrollToTop]);

    const showPostDetail = useCallback((postId) => {
        setSelectedPostId(postId);
        setSelectedProductId(null);
        setCurrentPage('post-detail');
        scrollToTop();
    }, [scrollToTop]);

    const showProductDetail = useCallback((productId) => {
        setSelectedProductId(productId);
        setSelectedPostId(null);
        setCurrentPage('product-detail');
        scrollToTop();
    }, [scrollToTop]);

    return {
        currentPage,
        selectedPostId,
        selectedProductId,
        goToPage,
        showPostDetail,
        showProductDetail
    };
};

export default usePageNavigation;
