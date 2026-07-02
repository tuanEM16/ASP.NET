import React from 'react';
import { ArrowLeft, SearchX } from 'lucide-react';

const NotFound = ({ onNavigateHome }) => (
    <div className="container page-section">
        <div className="not-found-panel">
            <SearchX size={50} />
            <p className="section-kicker">404</p>
            <h1>Không tìm thấy trang</h1>
            <p>Trang bạn đang tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác.</p>
            <button type="button" className="btn btn-primary" onClick={onNavigateHome}>
                <ArrowLeft size={18} />
                Về trang chủ
            </button>
        </div>
    </div>
);

export default NotFound;
