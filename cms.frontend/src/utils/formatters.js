const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

export const formatCurrency = (value) => currencyFormatter.format(value || 0);

export const formatDate = (value) => {
    if (!value) {
        return 'Đang cập nhật';
    }

    return new Date(value).toLocaleDateString('vi-VN');
};
