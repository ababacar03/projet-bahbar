import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class axiosService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_BASE_URL,
            timeout: 150000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor pour ajouter le token à chaque requête
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {

    return await this.axiosInstance.get<T>(url, config);
}

public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.axiosInstance.delete<T>(url, config);
  }
}

export default new axiosService();

