"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppMessageSender = void 0;
const axios_1 = __importDefault(require("axios"));
const AxiosErrorHandler_1 = require("../utils/AxiosErrorHandler");
class WhatsAppMessageSender {
    constructor(accessToken, phone) {
        this.apiURL = 'https://graph.facebook.com/v17.0';
        this.accessToken = accessToken;
        this.phone = phone;
        this.headers = {
            Authorization: `Bearer ${this.accessToken}`
        };
    }
    sendTextMessage(recipientPhoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            recipientPhoneNumber = recipientPhoneNumber.startsWith("79") ? recipientPhoneNumber.replace("79", "789") : recipientPhoneNumber;
            const payload = {
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
                const response = yield axios_1.default.post(`${this.apiURL}/${this.phone}/messages`, payload, { headers: this.headers });
                return response;
            }
            catch (error) {
                (0, AxiosErrorHandler_1.handleAxiosError)(error);
            }
        });
    }
    markMessageAsRead(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const markReadPayload = {
                messaging_product: "whatsapp",
                status: "read",
                message_id: messageId
            };
            return axios_1.default.put(`${this.apiURL}/${this.phone}/messages`, markReadPayload, { headers: this.headers });
        });
    }
}
exports.WhatsAppMessageSender = WhatsAppMessageSender;
//# sourceMappingURL=WhatsAppMessageSender.js.map