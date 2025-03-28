import axios from "axios";
import { API_BASE_URL, REFRESH_TOKEN_KEY } from "@/lib/constants";
import client from "@/lib/axiosClient";

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  [key: string]: any; // for other user fields
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (
  username: string,
  password: string,
  expiresInMins: number = 1
) => {
  const response = await axios.post<LoginResponse>(
    "https://dummyjson.com/auth/login",
    {
      username,
      password,
      expiresInMins,
    }
  );
  return response.data;
};

export const getCurrentUser = async (accessToken: string) => {
  const response = await client.get<UserResponse>("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getNewAccessToken = async (
  refreshToken?: string,
  expiresInMins: number = 60
) => {
  const response = await client.post<RefreshResponse>(
    "/auth/refresh",
    {
      refreshToken,
      expiresInMins,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};
