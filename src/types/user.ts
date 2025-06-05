export interface AuthData {
  token: string;
  userId: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}


export interface SignInRequest{
    email: string;
    password: string;
}

export interface SignUpRequest{
    email: string;
    name: string;
    password: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}