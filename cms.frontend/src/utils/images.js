import { API_BASE_URL } from '../config/axios';

const backendUrl = API_BASE_URL.replace(/\/api\/?$/, '');

export const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return null;
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    return `${backendUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};
