namespace nets{
    
    export class SocketManager{
        public socket:Laya.Socket;
        private static instance:SocketManager;
        
        constructor(){

        }

        public static getInstance():SocketManager{
            if(!this.instance){
                this.instance = new SocketManager;
            }
            return this.instance;
        }

        public init():void{
            this.socket = new Laya.Socket();
            //这里我们采用小端
            this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
            //建立连接
            this.socket.connect("39.106.5.94",9555);
            this.socket.on(Laya.Event.OPEN, this, this.openHandler);
            this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
            this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
            this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
        }

        private openHandler(event: any = null): void {
            //正确建立连接；
            console.log("websocket connected!链接成功");
        }
        private receiveHandler(msg: any = null): void {
            //接收到数据触发函数
        }
        private closeHandler(e: any = null): void {
            //关闭事件
            console.log("websocket disconnected!");
        }
        private errorHandler(e: any = null): void {
            //连接出错
            alert("参数错误");
        }


    }   
}