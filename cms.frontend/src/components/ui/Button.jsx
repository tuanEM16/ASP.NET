import React from 'react';

const Button = ({ children, className = 'btn btn-primary', type = 'button', ...props }) => (
    <button type={type} className={className} {...props}>
        {children}
    </button>
);

export default Button;
