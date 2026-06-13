import React from 'react';

const useCart = () => {
    const [items, setItems] = React.useState([]);

    const addToCart = (product) => {
        if (!product) {
            return;
        }

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
                return currentItems.map((item) => (
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ));
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (productId) => {
        setItems((currentItems) => (
            currentItems
                .map((item) => (
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ))
                .filter((item) => item.quantity > 0)
        ));
    };

    const removeFromCart = (productId) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);

    return {
        items,
        totalQuantity,
        totalAmount,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart
    };
};

export default useCart;
