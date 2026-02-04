import { create } from 'zustand';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import axiosClient from '@/utils/axios/axiosClient';
import { GET_USER_SUBSCRIPTIONS } from '@/constants/apis';
import { IBaseModel, IPaginate } from '@/interfaces/general';
import { UserSubscription, GetUserSubscriptionsRequest } from '@/types/userSubscription';
import { User } from '@/types/user';

interface UserStore {
    loadingAuth: boolean;
    loading: boolean;
    authenticated: boolean;
    appUserId: string | null;
    userSubcriptions: UserSubscription[] | null;
    user: User | null;

    setAuthenticated: () => Promise<void>;
    getUser: () => Promise<void>;
    getUserSubsctiptions: () => Promise<void>;
    loginSuccess: (params: { token: string, refreshToken: string }) => void;
    logout: () => void;
}

// Hàm kiểm tra đồng bộ cookie ngay khi app vừa tải
const checkInitialToken = () => {
    if (typeof window !== 'undefined') {
        const token = getCookie('__accessToken');
        return !!token;
    }
    return false;
};

const hasToken = checkInitialToken();

const useUserStore = create<UserStore>((set, get) => ({
    // Nếu có token -> authenticated = true (Hiện profile luôn)
    // Nếu không -> authenticated = false (Hiện nút login luôn)
    authenticated: hasToken,

    // [FIX]: Luôn set false để tránh việc bị treo loading khi là khách (không có token)
    loadingAuth: false,

    loading: false,
    appUserId: null,
    userSubcriptions: null,
    user: null,

    setAuthenticated: async () => {
        const token = getCookie('__accessToken');
        const userId = getCookie('__appUserId'); // Có thể null nếu mới login xong chưa kịp lấy profile

        if (!token) {
            set({ authenticated: false, loadingAuth: false });
            return;
        }

        // Nếu có token, confirm state và cập nhật userId nếu có
        set((state) => ({
            authenticated: true,
            loadingAuth: false,
            appUserId: userId ? (userId as string) : state.appUserId
        }));
    },

    loginSuccess: ({ token, refreshToken }) => {
        setCookie('__accessToken', token, { path: '/', sameSite: 'lax' });
        setCookie('__refreshToken', refreshToken, { path: '/', sameSite: 'lax' });

        // Cập nhật store ngay lập tức để UI chuyển đổi
        set({
            authenticated: true,
            loadingAuth: false
        });
    },

    logout: () => {
        // 1. Xóa hết cookie
        deleteCookie('__accessToken');
        deleteCookie('__refreshToken');
        deleteCookie('__appUserId');

        // 2. Reset sạch state về null/false
        set({
            authenticated: false,
            appUserId: null,
            user: null,
            userSubcriptions: null,
            loadingAuth: false
        });

        // 3. Điều hướng
        window.location.href = '/signin';
    },

    getUser: async () => {
        const accessToken = getCookie('__accessToken');
        // Nếu không có token thì thôi, không gọi API, tránh lỗi 401
        if (!accessToken) {
            set({ authenticated: false });
            return;
        }

        try {
            const response = await axiosClient.get<IBaseModel<User>>("/profile");
            const userData = response.data.responseRequest;

            if (userData) {
                setCookie('__appUserId', userData.id, { path: '/', sameSite: 'lax' });

                set({
                    user: userData,
                    appUserId: userData.id,
                    authenticated: true
                });
            }
        } catch {

        }
    },

    getUserSubsctiptions: async () => {
        const userId = get().appUserId || getCookie('__appUserId');

        if (!userId) return;

        try {
            const request: GetUserSubscriptionsRequest = {
                userId: userId as string,
                searchProp: '', isAscending: true, page: 1, size: 100, orderOn: '', searchKey: ''
            };
            const response = await axiosClient.get<IBaseModel<IPaginate<UserSubscription>>>(GET_USER_SUBSCRIPTIONS, { params: request });

            if (response.data.isSuccess) {
                set({ userSubcriptions: response.data.responseRequest?.items.reverse() });
            }
        } catch {
        }
    },
}));

export default useUserStore;