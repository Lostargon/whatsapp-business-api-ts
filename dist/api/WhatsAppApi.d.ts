/// <reference types="node" />
import { EventEmitter } from 'events';
import { WhatsAppMessageSender } from './WhatsAppMessageSender';
export declare class WhatsAppApi extends EventEmitter {
    private app;
    messageSender: WhatsAppMessageSender;
    constructor(port: number, accessToken: string, phone: string);
    sendMessage(recipient: string, message: string): Promise<import("axios").AxiosResponse<any, any> | undefined>;
}
