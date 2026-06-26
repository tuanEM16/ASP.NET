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
