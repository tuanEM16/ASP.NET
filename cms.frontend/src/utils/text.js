export const createSummary = (content, fallback) => {
    if (!content) {
        return fallback || 'Nội dung bài viết sẽ được hiển thị trong trang chi tiết.';
    }

    const plainText = content.replace(/<[^>]+>/g, '').trim();
    return plainText.length > 120 ? `${plainText.substring(0, 120)}...` : plainText;
};
