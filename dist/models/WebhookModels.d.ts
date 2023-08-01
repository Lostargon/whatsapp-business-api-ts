export interface WhatsAppAccountWebhook {
    object: string;
    entry: Entry[];
}
export interface Entry {
    id: string;
    changes: Change[];
}
export interface Change {
    field: string;
    value: Message;
}
export interface Message {
    messaging_product: string;
    metadata: Metadata;
    contacts: Contact[];
    messages?: (TextMessage | ImageMessage | StickerMessage | LocationMessage | ButtonMessage)[];
    statuses?: Status[];
}
export interface Metadata {
    display_phone_number: string;
    phone_number_id: string;
}
export interface Contact {
    profile: Profile;
    wa_id: string;
}
export interface Profile {
    name: string;
}
export interface TextMessage {
    from: string;
    id: string;
    timestamp: string;
    type: "text";
    text: Text;
}
export interface Text {
    body: string;
}
export interface ImageMessage {
    from: string;
    id: string;
    timestamp: string;
    type: "image";
    image: Image;
}
export interface Image {
    caption: string;
    mime_type: string;
    sha256: string;
    id: string;
}
export interface StickerMessage {
    from: string;
    id: string;
    timestamp: string;
    type: "sticker";
    sticker: Sticker;
}
export interface Sticker {
    id: string;
    animated: boolean;
    mime_type: string;
    sha256: string;
}
export interface LocationMessage {
    from: string;
    id: string;
    timestamp: string;
    location: Location;
}
export interface Location {
    latitude: string;
    longitude: string;
    name: string;
    address: string;
}
export interface ButtonMessage {
    context: Context;
    from: string;
    id: string;
    timestamp: string;
    type: "button";
    button: Button;
}
export interface Context {
    from: string;
    id: string;
}
export interface Button {
    text: string;
    payload: string;
}
export interface Status {
    id: string;
    status: string;
    timestamp: string;
    recipient_id: string;
}
