import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

type Options = {
  server: HttpServer;
};

export class IoService {
  private static _instance: IoService; // singleton
  private ioServer: SocketIOServer;

  userSocketMap: any = {};

  private constructor(options: Options) {
    const { server } = options;

    // set up socket.io server - CORS
    this.ioServer = new SocketIOServer(server, {
      cors: {
        // origin: '*',
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST'],
      },
    });
    this.start(); // listen connectionsA
  }

  // init ioServer as singleton
  static initIo(options: Options) {
    IoService._instance = new IoService(options);
  }

  static get instance(): IoService {
    if (!IoService._instance) throw 'IoService is not initialized';

    return IoService._instance;
  }

  sendMessage(event: string, payload: Object) {
    this.ioServer.emit(event, payload);
  }

  // chat logic: map user to socket - chat room =====================
  static getReceiverSocketId(receiverId: string) {
    return IoService.instance.userSocketMap[receiverId];
  }
  sendOnlineUsers() {
    this.sendMessage(
      'getOnlineUsers',
      Object.keys(IoService.instance.userSocketMap)
    );
  }
  // end ================================================

  start() {
    this.ioServer.on('connection', socket => {
      console.log('Client connected');

      // // chat logic ---------------
      const userId = socket.handshake.query.userId; // react lo envia asi en query
      if (userId) IoService.instance.userSocketMap[userId as any] = socket.id;

      this.sendOnlineUsers(); // send online users to all clients

      socket.on('disconnect', () => {
        console.log('Client disconnected');

        // chat logic ---------------
        delete IoService.instance.userSocketMap[userId as any]; // remove user from map
        this.sendOnlineUsers(); // send online users to all
      });
    });
  }
}
