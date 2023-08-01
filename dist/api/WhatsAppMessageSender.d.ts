import { AxiosResponse } from 'axios';
export declare class WhatsAppMessageSender {
    private accessToken;
    private apiURL;
    private phone;
    private headers;
    constructor(accessToken: string, phone: string);
    sendTextMessage(recipientPhoneNumber: string, message: string): Promise<AxiosResponse | undefined>;
    markMessageAsRead(messageId: string): Promise<AxiosResponse | undefined>;
}
