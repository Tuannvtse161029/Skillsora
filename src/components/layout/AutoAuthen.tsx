"use client"

import useUserStore from '@/zustand/useUserStore';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

const AutoAuthen = () => {
    const { setAuthenticated, getUser, authenticated, user, loadingAuth } = useUserStore();

    useEffect(() => {
        if (authenticated) {
            if (!user) {
                Promise.allSettled([getUser()]);
            }
            return;
        };

        const token = getCookie('__accessToken');


        if (!token) {
            if (loadingAuth) {
                useUserStore.setState({ loadingAuth: false });
            }
            return;
        }

        const initAuth = async () => {
            await setAuthenticated();
            await getUser();
        };

        initAuth();

    }, [authenticated, user, setAuthenticated, getUser]);

    return null;
}

export default AutoAuthen;