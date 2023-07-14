import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';


export const fcmAxios = axios.create({
    baseURL: "https://fcm.googleapis.com/fcm",
    timeout: 10000,
    headers: {
        Authorization: "Bearer AAAAZot1Zls:APA91bEl3oudWWjNKq-Z-eGXJE2fFVF7KmC4gbi2dt_jcB2-JoBNEx9MzRcQz_iUTKfmygm6FHavv3cAGcdRkHB1DTEEAz9Eiq1ljY2C6oGniBd3CXT-ETZBYf5Tkzjc7dgRzH61weHw"
    }
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

fcmAxios.interceptors.request.use(requestInterceptor.onSuccess, requestInterceptor.onError);

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

fcmAxios.interceptors.response.use(responseInterceptor.onSuccess, responseInterceptor.onError);