export const createSummary = (content, fallback) => {
    if (!content) {
        return fallback || 'Nội dung bài viết sẽ được hiển thị trong trang chi tiết.';
    }

    const plainText = content
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/(p|div|li|ul|ol|h[1-6])>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, ' ')
        .trim();

    return plainText.length > 120 ? `${plainText.substring(0, 120)}...` : plainText;
};
