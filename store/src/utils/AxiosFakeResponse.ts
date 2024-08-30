import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

class AxiosFakeResponse {
    public createResponse<Response>(reponse: Response): AxiosResponse<Response> {
        return {
            data: reponse,
            status: 200,
            statusText: "OK",
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
    }
}

export default new AxiosFakeResponse();
