import config from '../../config.json';

class RoboticArmWebSocket {
    private ws: WebSocket | null = null;
    private static instance: RoboticArmWebSocket;

    private constructor() {
        this.connect();
    }

    static getInstance() {
        if (!RoboticArmWebSocket.instance) {
            RoboticArmWebSocket.instance = new RoboticArmWebSocket();
        }
        return RoboticArmWebSocket.instance;
    }

    private connect() {
        this.ws = new WebSocket(config.WEBSOCKET_IP);
        
        this.ws.onopen = () => {
            console.log('Connected to robotic arm server');
        };

        this.ws.onclose = () => {
            console.log('Disconnected from robotic arm server');
            // Attempt to reconnect after 2 seconds
            setTimeout(() => this.connect(), 2000);
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    sendJointCommand(jointId: number, value: number) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const command = {
                joint: jointId,
                value: (value * Math.PI) / 180 // Convert to radians
            };
            this.ws.send(JSON.stringify(command));
        }
    }

    executeLuaFunction(functionName: string, args: any[] = []) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const request = {
                func: functionName,
                args: args
            };
            this.ws.send(JSON.stringify(request));
        }
    }


}


export default RoboticArmWebSocket;
