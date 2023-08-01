# WhatsApp Business API Library

This library provides a seamless interface to interact with the WhatsApp Business API, allowing you to send text messages, images, audios, and more.

## Installation

Install the package using npm:

```bash
npm install Lostargon/whatsapp-business-api-ts
```

## Usage
### Importing the Library

You can import specific parts of the library like this:

```javascript
import { wa, messageModels, webhookModels } from 'whatsapp-business-api-ts';
```

### Sending a Text Message
Create an instance of the API and send a text message:

```javascript
const api = new wa.WhatsAppApi(port, accessToken, phone);
api.sendMessage('1234567890', 'Hello, World!');
```

### Listening to Messages
You can also listen to incoming messages:

```javascript
api.on('text', (message, from) => {
console.log(`Received text message from ${from}: ${message.text.body}`);
});
```

### License
This project is licensed under the MIT License.