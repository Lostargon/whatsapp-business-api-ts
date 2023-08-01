"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppApi = void 0;
const express_1 = __importDefault(require("express"));
const events_1 = require("events");
const WhatsAppMessageSender_1 = require("./WhatsAppMessageSender");
class WhatsAppApi extends events_1.EventEmitter {
    constructor(port, accessToken, phone) {
        super();
        console.log(phone);
        this.app = (0, express_1.default)();
        this.messageSender = new WhatsAppMessageSender_1.WhatsAppMessageSender(accessToken, phone);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.post('/', (req, res) => {
            const data = req.body;
            if (data.object === 'whatsapp_business_account') {
                data.entry.forEach((entry) => {
                    entry.changes.forEach((change) => {
                        var _a;
                        if (change.field === 'messages') {
                            const messageValue = change.value;
                            (_a = messageValue.messages) === null || _a === void 0 ? void 0 : _a.forEach((message) => {
                                console.log(message);
                                if ('text' in message) {
                                    this.emit('text', message, message.from);
                                }
                                else if ('image' in message) {
                                    this.emit('image', message, message.from);
                                }
                                else if ('sticker' in message) {
                                    this.emit('sticker', message, message.from);
                                }
                                else if ('location' in message) {
                                    this.emit('location', message, message.from);
                                }
                                else if ('button' in message) {
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
    sendMessage(recipient, message) {
        return this.messageSender.sendTextMessage(recipient, message);
    }
}
exports.WhatsAppApi = WhatsAppApi;
//# sourceMappingURL=WhatsAppApi.js.map