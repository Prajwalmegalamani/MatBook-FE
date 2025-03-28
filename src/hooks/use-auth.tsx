"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY, EMAIL, REFRESH_TOKEN_KEY } from "@/lib/constants";
import { useToast } from "./use-toast";
import client from "@/lib/axiosClient";
import { getNewAccessToken } from "@/api/auth";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
const removeOnLogoutKeys = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY];

export interface ILoginData {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  userEmail: string | undefined;
  authStateLoaded: boolean;
  isLoggedIn: boolean;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  clearStateOnLogout: () => void;
  onLoginSuccess: (data: ILoginData) => void;
}

const AuthContext = createContext<AuthContextType>({
  userEmail: undefined,
  authStateLoaded: false,
  isLoggedIn: false,
  clearStateOnLogout: () => {},
  onLoginSuccess: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authStateLoaded, setAuthStateLoaded] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const accessTokenRef = useRef<string | null>(null);
  const refreshTokenCountRef = useRef<number>(0);
  const logoutCountRef = useRef<number>(0);
  const { toastSuccess, toastError, toastWarning } = useToast();

  const router = useRouter();

  const attachResponseInterceptor = () => {
    client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      config.headers.Authorization = accessTokenRef.current;
      return config;
    });

    let requestArray: InternalAxiosRequestConfig[] = [];
    client.interceptors.response.use(
      (response) => {
        if (response?.status === 403) {
          toastError("You have been logged out");
          setTimeout(() => {
            clearStateOnLogout();
          }, 1000);
        }
        if (response.data) {
          const { success, errorMessage } = response.data;

          requestArray = requestArray.filter(Boolean);
          if (requestArray.length !== 0) {
            requestArray.forEach(function (
              x: InternalAxiosRequestConfig,
              i: number
            ) {
              if (response.config?.url === x?.url) {
                requestArray.splice(i, 1);
              }
            });
          }

          if (success === false && errorMessage) {
            response.status = 500;
            return Promise.reject(new Error(errorMessage));
          }
        }

        requestArray = requestArray.filter(Boolean);
        if (requestArray.length !== 0) {
          requestArray.forEach(function (
            x: InternalAxiosRequestConfig,
            i: number
          ) {
            if (x && response?.config?.url === x?.url) {
              requestArray.splice(i, 1);
            }
          });
        }
        return response;
      },
      async (error) => {
        if (
          error.data === "Invalid refresh token." ||
          error.response?.data === "Invalid refresh token."
        ) {
          clearStateOnLogout();
          toastWarning("Logging out");
        }
        const originalRequest = error.config; // save original request to be retried later
        if (
          error?.response?.status !== 403 &&
          error?.response?.status !== 401
        ) {
          requestArray.push(originalRequest);
        }

        if (error?.response?.status === 403) {
          if (logoutCountRef.current < 5) {
            logoutCountRef.current = logoutCountRef.current + 1;
          } else {
            clearStateOnLogout();
          }
        } else if (error?.response?.status === 401 && !originalRequest._retry) {
          try {
            if (refreshTokenCountRef.current < 1) {
              refreshTokenCountRef.current = refreshTokenCountRef.current + 1;
              const res = await getNewAccessToken(refreshToken, 60);
              if (res.status === 403) {
                await clearStateOnLogout();
              } else if (res) {
                const { accessToken } = res.data;
                await setPersistedAuthToken(accessToken);
              } else {
                await clearStateOnLogout();
              }
            }
          } catch (err: unknown) {
            if (
              err instanceof AxiosError &&
              err.response?.data.errorCode === 403
            ) {
              if (logoutCountRef.current < 1) {
                logoutCountRef.current = logoutCountRef.current + 1;
              }
              await clearStateOnLogout();
            }
          }
        } else {
          await clearStateOnLogout();
        }
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    const initAuth = async () => {
      await reloadPersistedAuthToken();
      setAuthStateLoaded(true);
      if (accessTokenRef.current) {
        setIsLoggedIn(true);
      }
    };

    initAuth();
    attachResponseInterceptor();
  }, []);

  useEffect(() => {
    if (!accessTokenRef.current && authStateLoaded) {
      router.push("/login");
    }
  }, [authStateLoaded, router]);

  const onLoginSuccess = async ({ accessToken, refreshToken }: ILoginData) => {
    await setPersistedAuthToken(accessToken, refreshToken);
    setIsLoggedIn(true);
    toastSuccess("Welcome Back");
    router.push(`/dashboard`);
  };

  const reloadPersistedAuthToken = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const email = localStorage.getItem(EMAIL);
      accessTokenRef.current = accessToken;
      setRefreshToken(refreshToken || "");
      setAccessToken(accessToken || "");
      if (email) {
        setUserEmail(email);
      }
    } catch (err) {
      console.log("reloadPersistedAuthToken------", err);
    }
  };

  const clearStateOnLogout = async () => {
    accessTokenRef.current = null;
    setAccessToken(undefined);
    setRefreshToken(undefined);
    removeOnLogoutKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    sessionStorage.clear();
    if (accessTokenRef.current) {
      localStorage.clear();
    }
    setIsLoggedIn(false);
    router.push("/login");
  };

  const setPersistedAuthToken = async (
    accessToken: string,
    refreshToken?: string
  ) => {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      accessTokenRef.current = accessToken;
      refreshTokenCountRef.current = 0;
    } catch (err) {
      console.log("setPersistedAuthToken------", err);
      await clearStateOnLogout();
    }
  };

  const authContextValue: AuthContextType = {
    userEmail,
    authStateLoaded,
    isLoggedIn,
    accessToken,
    refreshToken,
    clearStateOnLogout,
    onLoginSuccess,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
