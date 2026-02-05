import { create } from 'zustand';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import axiosClient from '@/utils/axios/axiosClient';
import { GET_USER_SUBSCRIPTIONS } from '@/constants/apis';
import { IBaseModel, IPageRequest, IPaginate } from '@/interfaces/general';
import { UserSubscription } from '@/types/userSubscription';
import { User } from '@/types/user';

interface UserStore {
    loadingAuth: boolean;
    loading: boolean;
    authenticated: boolean;
    appUserId: string | null;
    userSubcriptions: UserSubscription[] | null;
    user: User | null;
    userSubscriptions: IPaginate<UserSubscription> | null;
    subscriptionQuery: IPageRequest;

    setSubscriptionPage: (page: number) => void;
    setSubscriptionSize: (size: number) => void;
    toggleSubscriptionSort: () => void;
    setAuthenticated: () => Promise<void>;
    getUser: () => Promise<void>;
    getUserSubsctiptions: () => Promise<void>;
    loginSuccess: (params: { token: string, refreshToken: string }) => void;
    logout: () => void;
}

const checkInitialToken = () => {
    if (typeof window !== 'undefined') {
        const token = getCookie('__accessToken');
        return !!token;
    }
    return false;
};

const hasToken = checkInitialToken();

const useUserStore = create<UserStore>((set, get) => ({

    authenticated: hasToken,

    loadingAuth: false,

    loading: false,
    appUserId: null,
    userSubcriptions: null,
    user: null,
    userSubscriptions: null,

    subscriptionQuery: {
        page: 1,
        size: 5,
        isAscending: false,
        orderOn: 'startDate',
        searchKey: '',
        searchProp: '',
    },


    setAuthenticated: async () => {
        const token = getCookie('__accessToken');
        const userId = getCookie('__appUserId');

        if (!token) {
            set({ authenticated: false, loadingAuth: false });
            return;
        }

        set((state) => ({
            authenticated: true,
            loadingAuth: false,
            appUserId: userId ? (userId as string) : state.appUserId
        }));
    },

    loginSuccess: ({ token, refreshToken }) => {
        setCookie('__accessToken', token, { path: '/', sameSite: 'lax' });
        setCookie('__refreshToken', refreshToken, { path: '/', sameSite: 'lax' });

        set({
            authenticated: true,
            loadingAuth: false
        });
    },

    logout: () => {
        deleteCookie('__accessToken');
        deleteCookie('__refreshToken');
        deleteCookie('__appUserId');

        set({
            authenticated: false,
            appUserId: null,
            user: null,
            userSubcriptions: null,
            loadingAuth: false
        });

        window.location.href = '/';
    },

    getUser: async () => {
        const accessToken = getCookie('__accessToken');
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
            set({ loading: true });

            const response = await axiosClient.get<
                IBaseModel<IPaginate<UserSubscription>>
            >(GET_USER_SUBSCRIPTIONS, {
                params: {
                    ...get().subscriptionQuery,
                },
            });

            if (response.data.isSuccess) {
                set({
                    userSubscriptions: response.data.responseRequest,
                });
            }
        } finally {
            set({ loading: false });
        }
    },


    setSubscriptionPage: (page: number) => {
        set((state) => ({
            subscriptionQuery: {
                ...state.subscriptionQuery,
                page,
            },
        }));
        get().getUserSubsctiptions();
    },

    setSubscriptionSize: (size: number) =>
        set((state) => ({
            subscriptionQuery: {
                ...state.subscriptionQuery,
                size,
                page: 1,
            },
        })),

    toggleSubscriptionSort: () =>
        set((state) => ({
            subscriptionQuery: {
                ...state.subscriptionQuery,
                isAscending: !state.subscriptionQuery.isAscending,
                page: 1,
            },
        })),

}));

export default useUserStore;