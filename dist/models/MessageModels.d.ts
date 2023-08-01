export interface TextMessage {
    preview_url: boolean | string;
    body: string;
}
export interface ImageMessage {
    id: string;
}
export interface AudioMessage {
    link: string;
}
export interface Button {
    type: string;
    reply: {
        id: string;
        title: string;
    };
}
export interface InteractiveMessage {
    type: string;
    body: {
        text: string;
    };
    action: {
        buttons: Button[];
    };
}
export interface MessagePayload {
    messaging_product: string;
    recipient_type: string;
    to: string;
    type: string;
    text?: TextMessage;
    image?: ImageMessage;
    audio?: AudioMessage;
    interactive?: InteractiveMessage;
}
export interface MarkReadPayload {
    messaging_product: string;
    status: string;
    message_id: string;
}
