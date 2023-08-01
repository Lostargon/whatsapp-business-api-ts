import axios, { AxiosResponse } from 'axios';
import { TextMessage, ImageMessage, AudioMessage, InteractiveMessage, MessagePayload, MarkReadPayload } from '../models/MessageModels';
import { handleAxiosError } from '../utils/AxiosErrorHandler';

export class WhatsAppMessageSender {
    private accessToken: string;
    private apiURL: string = 'https://graph.facebook.com/v17.0';
    private phone: string;
    private headers: any;

    constructor(accessToken: string, phone: string) {
        this.accessToken = accessToken;
        this.phone = phone;
        this.headers = {
            Authorization: `Bearer ${this.accessToken}`
        };
    }

    async sendTextMessage(recipientPhoneNumber: string, message: string): Promise<AxiosResponse | undefined> {
        recipientPhoneNumber = recipientPhoneNumber.startsWith("79") ? recipientPhoneNumber.replace("79", "789") : recipientPhoneNumber;
        const payload: MessagePayload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: recipientPhoneNumber,
            type: "text",
            text: {
                preview_url: false,
                body: message
            }

        };

        try {
            console.log(this.phone);
            const response = await axios.post(`${this.apiURL}/${this.phone}/messages`, payload, { headers: this.headers });
            return response;
        } catch (error) {
            handleAxiosError(error);
        }
    }

    async markMessageAsRead(messageId: string): Promise<AxiosResponse<any>> {
        const markReadPayload: MarkReadPayload = {
            messaging_product: "whatsapp",
            status: "read",
            message_id: messageId
        };

        return axios.put(`${this.apiURL}/${this.phone}/messages`, markReadPayload, { headers: this.headers });
    }

    // Add similar methods for sending other types of messages (image, audio, interactive) here
}
