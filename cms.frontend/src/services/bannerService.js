import axiosClient from './api';

const bannerService = {
    getActiveBanners: () => axiosClient.get('/BannerApi')
};

export default bannerService;
