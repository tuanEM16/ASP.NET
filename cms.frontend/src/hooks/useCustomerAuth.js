import React from 'react';

const CUSTOMER_STORAGE_KEY = 'eyestyle-customer';

const readStoredCustomer = () => {
    try {
        const storedCustomer = window.localStorage.getItem(CUSTOMER_STORAGE_KEY);
        const customer = storedCustomer ? JSON.parse(storedCustomer) : null;
        return customer && customer.id && customer.email ? customer : null;
    } catch {
        return null;
    }
};

const useCustomerAuth = () => {
    const [customer, setCustomer] = React.useState(readStoredCustomer);

    const signIn = React.useCallback((customerProfile) => {
        const publicProfile = {
            id: customerProfile.id,
            fullName: customerProfile.fullName,
            email: customerProfile.email,
            phone: customerProfile.phone || '',
            address: customerProfile.address || ''
        };

        window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(publicProfile));
        setCustomer(publicProfile);
    }, []);

    const signOut = React.useCallback(() => {
        window.localStorage.removeItem(CUSTOMER_STORAGE_KEY);
        setCustomer(null);
    }, []);

    return {
        customer,
        isAuthenticated: Boolean(customer),
        signIn,
        signOut
    };
};

export default useCustomerAuth;
