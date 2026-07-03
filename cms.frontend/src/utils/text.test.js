import { createSummary } from './text';

describe('createSummary', () => {
    it('converts rich HTML into readable plain text', () => {
        const html = '<p>Kính thời trang hiện đại.</p><ul><li>Chống UV</li><li>Gọng nhẹ</li></ul>';

        expect(createSummary(html)).toBe('Kính thời trang hiện đại. Chống UV Gọng nhẹ');
    });

    it('uses fallback content when the description is empty', () => {
        expect(createSummary('', 'Mô tả dự phòng')).toBe('Mô tả dự phòng');
    });
});
