import React from 'react';
import CategoryProductList from './components/CategoryProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <CategoryProductList />
                </div>
                <div className="col-md-8">
                    <div className="alert alert-info">
                        <h4>Chào mừng đến với CMS</h4>
                        <p>Danh mục bên trái được lấy trực tiếp từ Database qua Web API.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;