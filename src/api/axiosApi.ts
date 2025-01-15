import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface ApiResponse {
    policy: string;
}

export class AxiosApi {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000, // Таймаут запроса в миллисекундах
        });
    }

    /**
     * Выполняет GET-запрос на эндпоинт `/test`
     * @returns Promise с типизированным ответом ApiResponse
     */
    public async getTestData(): Promise<ApiResponse> {
        try {
            const response: AxiosResponse<ApiResponse> = await this.axiosInstance.get('/policy');
            return response.data;
        } catch (error) {
            console.error('Ошибка при выполнении GET-запроса:', error);
            throw new Error('Не удалось получить данные с сервера.');
        }
    }
}
