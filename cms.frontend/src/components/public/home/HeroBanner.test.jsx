import { fireEvent, render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';

test('renders an active database banner and opens its product target', () => {
    const onViewProduct = jest.fn();

    render(
        <HeroBanner
            brand={{ name: 'EyeStyle', suffix: '.Store' }}
            banners={[{
                id: 2,
                title: 'Luna Cat-Eye Black',
                subtitle: 'Thiết kế mắt mèo nổi bật.',
                imageUrl: '/images/luna.jpg',
                buttonText: 'Xem sản phẩm',
                targetType: 'product',
                targetValue: '5'
            }]}
            onNavigate={jest.fn()}
            onViewProduct={onViewProduct}
            onViewPost={jest.fn()}
        />
    );

    expect(screen.getByRole('heading', { name: 'Luna Cat-Eye Black' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Xem sản phẩm/i }));
    expect(onViewProduct).toHaveBeenCalledWith(5);
});
