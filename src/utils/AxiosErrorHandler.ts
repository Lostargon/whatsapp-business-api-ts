import { AxiosError } from 'axios';

export function handleAxiosError(error: any) {
    const axiosError = error as AxiosError;
    if (axiosError && axiosError.response) {
        console.log('Error Status:', axiosError.response.status);
        console.log('Error Data:', axiosError.response.data);
    } else {
        console.log('Error', axiosError);
    }
}
