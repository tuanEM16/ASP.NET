import { getContentHtml, getImageUrl } from './images';

describe('image URL helpers', () => {
    it('adds the backend origin to relative image URLs', () => {
        expect(getImageUrl('/uploads/example.jpg'))
            .toBe('https://localhost:7098/uploads/example.jpg');
    });

    it('keeps absolute image URLs unchanged', () => {
        const imageUrl = 'https://cdn.example.com/example.jpg';

        expect(getImageUrl(imageUrl)).toBe(imageUrl);
        expect(getContentHtml(`<p><img src="${imageUrl}"></p>`))
            .toContain(`src="${imageUrl}"`);
    });

    it('updates images embedded in CKEditor HTML', () => {
        const content = '<p>Nội dung</p><figure><img src="/uploads/example.jpg"></figure>';

        expect(getContentHtml(content))
            .toContain('src="https://localhost:7098/uploads/example.jpg"');
    });

    it('returns an empty string when content is missing', () => {
        expect(getContentHtml(null)).toBe('');
    });
});
