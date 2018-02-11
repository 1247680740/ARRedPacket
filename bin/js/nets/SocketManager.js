var nets;
(function (nets) {
    var SocketManager = /** @class */ (function () {
        function SocketManager() {
        }
        SocketManager.getInstance = function () {
            if (!this.instance) {
                this.instance = new SocketManager;
            }
            return this.instance;
        };
        SocketManager.prototype.init = function () {
            this.socket = new Laya.Socket();
            //这里我们采用小端
            this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
            //建立连接
            this.socket.connect("39.106.5.94", 9555);
            this.socket.on(Laya.Event.OPEN, this, this.openHandler);
            this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
            this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
            this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
        };
        SocketManager.prototype.openHandler = function (event) {
            if (event === void 0) { event = null; }
            //正确建立连接；
            console.log("websocket connected!链接成功");
        };
        SocketManager.prototype.receiveHandler = function (msg) {
            if (msg === void 0) { msg = null; }
            //接收到数据触发函数
        };
        SocketManager.prototype.closeHandler = function (e) {
            if (e === void 0) { e = null; }
            //关闭事件
            console.log("websocket disconnected!");
        };
        SocketManager.prototype.errorHandler = function (e) {
            if (e === void 0) { e = null; }
            //连接出错
            alert("参数错误");
        };
        return SocketManager;
    }());
    nets.SocketManager = SocketManager;
})(nets || (nets = {}));
//# sourceMappingURL=SocketManager.js.map