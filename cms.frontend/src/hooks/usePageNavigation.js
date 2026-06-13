import { useState } from 'react';

const usePageNavigation = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        setSelectedPostId(null);
        setSelectedProductId(null);
        scrollToTop();
    };

    const showPostDetail = (postId) => {
        setSelectedPostId(postId);
        setSelectedProductId(null);
        setCurrentPage('post-detail');
        scrollToTop();
    };

    const showProductDetail = (productId) => {
        setSelectedProductId(productId);
        setSelectedPostId(null);
        setCurrentPage('product-detail');
        scrollToTop();
    };

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
