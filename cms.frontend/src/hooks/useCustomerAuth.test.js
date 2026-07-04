import { act, renderHook } from '@testing-library/react';
import useCustomerAuth from './useCustomerAuth';

describe('useCustomerAuth', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('stores only the public customer profile and removes it on sign out', () => {
        const { result } = renderHook(() => useCustomerAuth());

        act(() => {
            result.current.signIn({
                id: 7,
                fullName: 'Nguyễn Văn A',
                email: 'customer@example.com',
                phone: '0900000000',
                address: 'TP.HCM',
                password: 'must-not-be-stored'
            });
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.customer.fullName).toBe('Nguyễn Văn A');
        expect(window.localStorage.getItem('eyestyle-customer')).not.toContain('must-not-be-stored');

        act(() => {
            result.current.signOut();
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(window.localStorage.getItem('eyestyle-customer')).toBeNull();
    });
});
