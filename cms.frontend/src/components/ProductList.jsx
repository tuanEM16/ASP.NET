import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import productService from '../services/productService';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

const backendUrl = axiosClient.defaults.baseURL.replace(/\/api\/?$/, '');

const getProductImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    return `${backendUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

const ProductList = ({ selectedCategoryId, limit, heading = 'Sản phẩm nổi bật', intro }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi tải danh sách sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center my-4">Đang tải danh sách sản phẩm thời trang...</div>;
    }

    const filteredProducts = selectedCategoryId
        ? products.filter((item) => item.categoryProductId === selectedCategoryId)
        : products;
    const visibleProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

    return (
        <section id="san-pham" className="home-section">
            <div className="section-heading">
                <div>
                    <p className="section-kicker">Bộ sưu tập</p>
                    <h2>{heading}</h2>
                    {intro && <span className="section-muted">{intro}</span>}
                </div>
            </div>

            {visibleProducts.length === 0 ? (
                <p className="text-muted">Chưa có sản phẩm nào trong hệ thống.</p>
            ) : (
                <div className="row">
                    {visibleProducts.map((item) => {
                        const imageUrl = getProductImageUrl(item.imageUrl);

                        return (
                            <div className="col-sm-6 col-lg-3 mb-4" key={item.id}>
                                <article className="product-card h-100">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            className="product-image"
                                            alt={item.name}
                                        />
                                    )}
                                    <div className="product-body">
                                        <h3>{item.name}</h3>
                                        <p className="product-description">
                                            {item.description || 'Đang cập nhật mô tả sản phẩm.'}
                                        </p>
                                        <p className="product-price">{currencyFormatter.format(item.price || 0)}</p>
                                        <p className="product-stock">Tồn kho: {item.stockQuantity ?? 0} sản phẩm</p>
                                    </div>
                                    <div className="product-actions">
                                        <a href="#san-pham" className="btn btn-outline-primary btn-sm">
                                            Chi tiết
                                        </a>
                                        <a href="#lien-he" className="btn btn-success btn-sm">
                                            Mua ngay
                                        </a>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default ProductList;
