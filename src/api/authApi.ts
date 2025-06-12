import axiosClient from './axiosClient';
import {
    AuthData,
    AuthResponse,
    SignInRequest,
    SignUpRequest,
    UserProfile,
} from './../types/user';

const authApi = {

    loginToken: async (type: string): Promise<AuthData> => {
        const response = await axiosClient.get<AuthResponse>(`/users/login-token?type=${type}`); 
        return response.data.data;
    },

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

    updateProfile: async (data: UserProfile): Promise<UserProfile> => {
        const formData = new FormData();

        if(data?._id){
            formData.append('id', data._id);
        }
        if(data?.email){
            formData.append('email', data.email);
        }
        if(data?.name){
            formData.append('name', data.name);
        }
        if (data.avatarFile) {
            formData.append('file', data.avatarFile);
        }
        if (data.password) {
            formData.append('password', data.password);
        }

        const response = await axiosClient.put<AuthResponse>(`/users/update`, formData);
        return response.data.data;
    },

};

export default authApi;
