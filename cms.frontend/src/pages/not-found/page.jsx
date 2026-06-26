import React from 'react';

const NotFound = ({ onNavigateHome }) => (
    <div className="container page-section">
        <div className="alert alert-warning">Không tìm thấy trang.</div>
        <button type="button" className="btn btn-primary" onClick={onNavigateHome}>
            Về trang chủ
        </button>
    </div>
);

export default NotFound;
