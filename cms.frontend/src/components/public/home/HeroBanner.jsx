import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../../../utils/images';
import { createSummary } from '../../../utils/text';

const buildSlides = ({ brand, banners, products, posts }) => {
    const bannerSlides = banners.map((banner) => ({
        id: `banner-${banner.id}`,
        type: 'banner',
        title: banner.title,
        description: banner.subtitle || 'Khám phá bộ sưu tập kính mắt mới tại EyeStyle.Store.',
        imageUrl: getImageUrl(banner.imageUrl),
        buttonText: banner.buttonText || 'Xem chi tiết',
        targetType: banner.targetType || 'products',
        targetValue: banner.targetValue
    }));

    if (bannerSlides.length > 0) {
        return bannerSlides;
    }

    const productSlides = products.slice(0, 3).map((product) => ({
        id: `product-${product.id}`,
        type: 'product',
        title: product.name,
        description: createSummary(
            product.description,
            'Mẫu kính mắt thời trang đang có sẵn tại cửa hàng.'
        ),
        imageUrl: getImageUrl(product.imageUrl),
        targetId: product.id
    }));

    const postSlides = posts.slice(0, 2).map((post) => ({
        id: `post-${post.id}`,
        type: 'post',
        title: post.title,
        description: 'Cập nhật xu hướng và kiến thức chọn kính từ hệ thống bài viết.',
        imageUrl: getImageUrl(post.imageUrl),
        targetId: post.id
    }));

    const slides = [...productSlides, ...postSlides];
    if (slides.length > 0) {
        return slides;
    }

    return [{
        id: 'default',
        type: 'products',
        title: `${brand.name}${brand.suffix}`,
        description: 'Phân phối kính râm, kính gọng và phụ kiện kính mắt thời trang.',
        imageUrl: null
    }];
};

const HeroBanner = ({
    brand,
    banners = [],
    products = [],
    posts = [],
    onNavigate,
    onViewProduct,
    onViewPost
}) => {
    const slides = React.useMemo(
        () => buildSlides({ brand, banners, products, posts }),
        [brand, banners, products, posts]
    );
    const [activeIndex, setActiveIndex] = React.useState(0);
    const activeSlide = slides[activeIndex] || slides[0];

    React.useEffect(() => {
        if (slides.length <= 1) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, 4500);

        return () => window.clearInterval(timer);
    }, [slides.length]);

    React.useEffect(() => {
        setActiveIndex(0);
    }, [slides.length]);

    const handlePrimaryAction = () => {
        if (activeSlide.type === 'banner') {
            if (activeSlide.targetType === 'product' && Number(activeSlide.targetValue)) {
                onViewProduct(Number(activeSlide.targetValue));
                return;
            }

            if (activeSlide.targetType === 'post' && Number(activeSlide.targetValue)) {
                onViewPost(Number(activeSlide.targetValue));
                return;
            }

            if (activeSlide.targetType === 'url'
                && /^https?:\/\//i.test(activeSlide.targetValue || '')) {
                window.location.assign(activeSlide.targetValue);
                return;
            }

            onNavigate(activeSlide.targetType || 'products');
            return;
        }

        if (activeSlide.type === 'product') {
            onViewProduct(activeSlide.targetId);
            return;
        }

        if (activeSlide.type === 'post') {
            onViewPost(activeSlide.targetId);
            return;
        }

        onNavigate('products');
    };

    return (
        <section
            className="hero-section hero-banner"
            style={activeSlide.imageUrl ? { '--hero-image': `url("${activeSlide.imageUrl}")` } : undefined}
        >
            <div className="container hero-inner">
                <div className="hero-copy">
                    <p className="hero-kicker">{brand.name}{brand.suffix}</p>
                    <h1>{activeSlide.title}</h1>
                    <p>{activeSlide.description}</p>
                    <div className="hero-actions">
                        <button type="button" className="btn btn-primary" onClick={handlePrimaryAction}>
                            {activeSlide.buttonText
                                || (activeSlide.type === 'post' ? 'Đọc bài viết' : 'Xem chi tiết')}
                            <ArrowRight size={18} />
                        </button>
                        <button type="button" className="btn btn-outline-dark" onClick={() => onNavigate('products')}>
                            <ShoppingBag size={18} />
                            Xem tất cả sản phẩm
                        </button>
                    </div>
                    {slides.length > 1 && (
                        <div className="hero-dots" aria-label="Chuyen slide noi bat">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    className={index === activeIndex ? 'active' : ''}
                                    aria-label={`Slide ${index + 1}`}
                                    onClick={() => setActiveIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
