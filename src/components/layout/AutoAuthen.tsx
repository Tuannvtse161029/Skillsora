"use client"

import useUserStore from '@/zustand/useUserStore';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

const AutoAuthen = () => {
    // Lấy thêm state loadingAuth để kiểm tra
    const { setAuthenticated, getUser, authenticated, user, loadingAuth } = useUserStore();

    useEffect(() => {
        // Case 1: Đã login, nhưng thiếu info user
        if (authenticated) {
            if (!user) {
                Promise.allSettled([getUser()]);
            }
            return;
        };

        const token = getCookie('__accessToken');

        // Case 2: Chưa login (Không có token)
        // [FIX]: Nếu không có token và đang loading, phải tắt loading đi để hiện nút Đăng Nhập
        if (!token) {
            if (loadingAuth) {
                useUserStore.setState({ loadingAuth: false });
            }
            return;
        }

        // Case 3: Có token trong cookie nhưng Store chưa auth
        const initAuth = async () => {
            await setAuthenticated();
            await getUser();
        };

        initAuth();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated, user, setAuthenticated, getUser]); // Bỏ loadingAuth khỏi dep để tránh loop không cần thiết

    return null;
}

export default AutoAuthen;