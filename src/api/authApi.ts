import axiosClient from './axiosClient';
import {
    AuthData,
    AuthResponse,
    SignInRequest,
    SignUpRequest,
    UserProfile,
} from './../types/user';

const authApi = {

    login: async (data: SignInRequest): Promise<AuthData> => {
        const response = await axiosClient.post<AuthResponse>('/users/signin', data);
        return response.data.data;
    },

    register: (data: SignUpRequest): Promise<AuthResponse> => {
        return axiosClient.post('/users/signup', data);
    },

    getProfile: (): Promise<UserProfile> => {
        return axiosClient.get('/users/profile');
    },
};

export default authApi;
