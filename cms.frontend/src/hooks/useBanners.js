import { useEffect, useState } from 'react';
import bannerService from '../services/bannerService';
import { toArray } from '../utils/arrays';

const useBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const data = await bannerService.getActiveBanners();
                setBanners(toArray(data));
            } catch (error) {
                console.error('Lỗi khi tải banner:', error);
                setBanners([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return { banners, loading };
};

export default useBanners;
