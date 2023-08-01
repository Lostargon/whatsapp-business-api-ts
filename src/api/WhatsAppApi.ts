import express from 'express';
import { EventEmitter } from 'events';
import { WhatsAppAccountWebhook, Entry, Change, TextMessage, ImageMessage, StickerMessage, LocationMessage, ButtonMessage } from '../models/WebhookModels';
import { WhatsAppMessageSender } from './WhatsAppMessageSender';

export class WhatsAppApi extends EventEmitter {
    private app: express.Application;
    messageSender: WhatsAppMessageSender;

    constructor(port: number, accessToken: string, phone: string) {
        super();
        console.log(phone);

        this.app = express();
        this.messageSender = new WhatsAppMessageSender(accessToken, phone);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.post('/', (req, res) => {
            const data: WhatsAppAccountWebhook = req.body;

            if (data.object === 'whatsapp_business_account') {
                data.entry.forEach((entry: Entry) => {
                    entry.changes.forEach((change: Change) => {
                        if (change.field === 'messages') {
                            const messageValue = change.value;
                            messageValue.messages?.forEach((message: TextMessage | ImageMessage | StickerMessage | LocationMessage | ButtonMessage) => {
                                console.log(message);
                                if ('text' in message) {
                                    this.emit('text', message, message.from);
                                } else if ('image' in message) {
                                    this.emit('image', message, message.from);
                                } else if ('sticker' in message) {
                                    this.emit('sticker', message, message.from);
                                } else if ('location' in message) {
                                    this.emit('location', message, message.from);
                                } else if ('button' in message) {
                                    this.emit('button', message, message.from);
                                }
                            });
                        }
                    });
                });
            }
            res.status(200).send('Webhook received');
        });

        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    sendMessage(recipient: string, message: string) {
        return this.messageSender.sendTextMessage(recipient, message);
    }

}
