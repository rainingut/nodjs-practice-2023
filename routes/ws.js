import Websocket, { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss1 = new WebSocketServer({noServer: true});

wss1.on('connection', function connection(ws){
    ws.on('error', console.error);
    console.log(`✅connect success!`);
    const uuid = uuidv4();
    ws.uuid = uuid;

    // who's user
    const user = {
        context: 'user',
        uuid
    };

    // send message to user
    ws.send(JSON.stringify(user)); // only send string

    // watch
    ws.on('message', function(message){
        const msg = JSON.parse(message);
        const newMsg = {
            context: 'message',
            uuid,
            content: msg.content
        };
        // send directly
        sendAllUser(newMsg);
    });

});

function sendAllUser(msg){
    wss1.clients.forEach(client => {
        if(client.readyState === Websocket.OPEN){
            client.send(JSON.stringify(msg));
        }
    });
}

export default wss1;