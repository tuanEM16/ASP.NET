import { IMAGE_BASE_URL } from '../services/api';

export const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    return `${IMAGE_BASE_URL}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

export const getContentHtml = (content) => {
    if (!content) {
        return '';
    }

    const document = new DOMParser().parseFromString(content, 'text/html');

    document.querySelectorAll('img[src]').forEach((image) => {
        image.setAttribute('src', getImageUrl(image.getAttribute('src')));
    });

    return document.body.innerHTML;
};
