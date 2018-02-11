var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var nets;
(function (nets) {
    var EventDispatcher = laya.events.EventDispatcher;
    var HttpRequest = laya.net.HttpRequest;
    var Event = laya.events.Event;
    /**
     * 数据通信模块
     */
    var HttpService = /** @class */ (function (_super) {
        __extends(HttpService, _super);
        function HttpService() {
            var _this = _super.call(this) || this;
            _this.protocolType = "https://";
            _this.sendDataType = "post"; //get
            _this.receiveDataType = "json"; //   "text";   //
            _this.reqHeader = ["Content-Type", "application/json"];
            return _this;
        }
        /**
         * 初始化通信组件
         */
        HttpService.prototype.init = function (host, port, path) {
            this.url = this.protocolType + host + path;
            this.http = new HttpRequest();
            this.http.on(Event.START, this, this.startHandler);
            this.http.on(Event.CLOSE, this, this.closeHandler);
            this.http.on(Event.ERROR, this, this.httpErrorHandler);
            this.http.on(Event.PROGRESS, this, this.httpProgrssHandler);
            this.http.on(Event.COMPLETE, this, this.httpCompleteHandler);
            // this.http.send(this.url,this.sendData,"post","json",this.reqHeader);
        };
        /**
         * ====================== 发送请求 ======================
         * 调用API接口并自定义回调函数获取结果,发送数据的格式为Object,{'数据名称':'数据值'}
         * @param sendData 要传递给API端的数据
         * @param selfData 带给回调函数的数据
         */
        HttpService.prototype.request = function (sendData, selfData) {
            if (!selfData)
                this.selfData = selfData;
            var sendStr = sendData;
            var index1 = (sendStr.indexOf("=")) + 1;
            var index2 = (sendStr.indexOf("&"));
            var apiName = sendStr.substring(index1, index2);
            this.http.send(this.url + apiName, sendData, this.sendDataType, this.receiveDataType); // , this.reqHeader);     ,["Content-Type","application/json"]
        };
        HttpService.prototype.startHandler = function (msg) {
            console.log("HttpService, start, msg:" + msg);
        };
        HttpService.prototype.closeHandler = function (msg) {
            console.error("HttpService, close, msg:" + msg);
        };
        HttpService.prototype.httpErrorHandler = function (errMsg) {
            console.error("HttpService, has error:" + errMsg);
        };
        HttpService.prototype.httpProgrssHandler = function (progrss) {
            var proMsg;
            if (progrss)
                proMsg = progrss * 100 + "%";
            console.log("HttpService, progress is:" + proMsg);
        };
        HttpService.prototype.httpCompleteHandler = function (data) {
            this.receiveData = this.http.data;
            console.info("HttpService, httpCompleteHandler, receive data:\n" + JSON.stringify(this.receiveData));
            if (typeof this.receiveData === "string") {
                try {
                    this.receiveData = JSON.parse(this.receiveData);
                }
                catch (error) {
                    console.error("HttpService, httpCompleteHandler, catch error: " + error);
                }
            }
            // 返回成功
            if (this.receiveData["status"] == "ok") {
                if (this.callback) {
                    if (this.selfData)
                        this.callback(this.receiveData, this.selfData);
                    else
                        this.callback(this.receiveData);
                }
            } // 返回失败
            else {
                console.error("HttpService, msg:" + this.receiveData["status"]);
                // 异常的后续处理（返回异常数据）
                if (this.callback) {
                    if (this.selfData)
                        this.callback(this.receiveData, this.selfData);
                    else
                        this.callback(this.receiveData);
                }
            }
        };
        return HttpService;
    }(EventDispatcher));
    nets.HttpService = HttpService;
})(nets || (nets = {}));
//# sourceMappingURL=HttpService.js.map