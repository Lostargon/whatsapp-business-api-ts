"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosError = void 0;
function handleAxiosError(error) {
    const axiosError = error;
    if (axiosError && axiosError.response) {
        console.log('Error Status:', axiosError.response.status);
        console.log('Error Data:', axiosError.response.data);
    }
    else {
        console.log('Error', axiosError);
    }
}
exports.handleAxiosError = handleAxiosError;
//# sourceMappingURL=AxiosErrorHandler.js.map