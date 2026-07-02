import React from 'react';

const CART_STORAGE_KEY = 'eyestyle-cart';

const getInitialItems = () => {
    try {
        const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);
        const parsedItems = storedItems ? JSON.parse(storedItems) : [];
        return Array.isArray(parsedItems) ? parsedItems : [];
    } catch {
        return [];
    }
};

const useCart = () => {
    const [items, setItems] = React.useState(getInitialItems);

    React.useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = (product, requestedQuantity = 1) => {
        if (!product) {
            return;
        }

        const quantityToAdd = Math.max(1, Number(requestedQuantity) || 1);

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);
            const stockQuantity = Number(product.stockQuantity ?? existingItem?.stockQuantity ?? 0);

            if (existingItem) {
                if (stockQuantity > 0 && existingItem.quantity + quantityToAdd > stockQuantity) {
                    window.alert('Số lượng sản phẩm trong kho không đủ!');
                    return currentItems;
                }

                return currentItems.map((item) => (
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                ));
            }

            if (stockQuantity <= 0 || quantityToAdd > stockQuantity) {
                window.alert('Số lượng sản phẩm trong kho không đủ!');
                return currentItems;
            }

            return [...currentItems, { ...product, quantity: quantityToAdd }];
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
