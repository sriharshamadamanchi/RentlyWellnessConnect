import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const mainAxios = axios.create({
    baseURL: "",
    timeout: 10000
});

const requestInterceptor = {
    onSuccess: async (config: any) => {
        try {
            //
        } catch (error) {
            console.log('error in axios.interceptors.request', error);
        }

        if (__DEV__) {
            console.log("req", config);
        }

        return config;
    },
    onError: (error: any): any => {
        Promise.reject(error);
    }
};

mainAxios.interceptors.request.use(requestInterceptor.onSuccess, requestInterceptor.onError);

const responseInterceptor = {
    onSuccess: (response: any): any => {
        if (__DEV__) {
            console.log("response", response);
        }

        if (typeof (response.data.success) !== 'undefined' && response.data.success === false) {
            console.log("Api Wrapper: Scenario 5: data.success as false ", response);

            return Promise.reject(new Error(response.data.message));
        }

        return response;
    },
    onError: async (error: any) => {
        const originalRequest = error.config;
        console.log(`Api Failed: API: ${originalRequest?.url ?? ""} timestamp: ${Date.now()}`,
            {
                request: originalRequest,
                response: error.response
            });

        return Promise.reject(error);
    }
};

mainAxios.interceptors.response.use(responseInterceptor.onSuccess, responseInterceptor.onError);