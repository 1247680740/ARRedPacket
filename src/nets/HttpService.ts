namespace nets {
    import EventDispatcher = laya.events.EventDispatcher;
    import HttpRequest = laya.net.HttpRequest;
    import URL = laya.net.URL;
    import Event = laya.events.Event;

    /**
     * 数据通信模块
     */
    export class HttpService extends EventDispatcher {
        http: HttpRequest;
        protocolType: string;
        /** 发送数据的方式，默认为 post */
        sendDataType: string;
        /** 请求地址 */
        url: string;
        /** 请求头 */
        reqHeader: Array<any>;
        /** 发送的数据（未用到） */
        sendData: Object;
        /** 接收的数据 */
        receiveData: Object;
        /** 回传数据的格式 */
        receiveDataType: string;
        /** 传给回调函数自身的参数 */
        selfData: any;

        callback: Function;

        constructor() {
            super();
            this.protocolType = "https://";
            this.sendDataType = "post";  //get
            this.receiveDataType = "json";     //   "text";   //
            this.reqHeader = ["Content-Type", "application/json"];

        }

        /**
         * 初始化通信组件
         */
        init(host: string, port: number, path: string): void {
            this.url = this.protocolType + host + path;

            this.http = new HttpRequest();
            this.http.on(Event.START, this, this.startHandler);
            this.http.on(Event.CLOSE, this, this.closeHandler);
            this.http.on(Event.ERROR, this, this.httpErrorHandler);
            this.http.on(Event.PROGRESS, this, this.httpProgrssHandler);
            this.http.on(Event.COMPLETE, this, this.httpCompleteHandler);
        }

        /**
         * ====================== 发送请求 ======================
		 * 调用API接口并自定义回调函数获取结果,发送数据的格式为Object,{'数据名称':'数据值'}
		 * @param sendData 要传递给API端的数据
		 * @param selfData 带给回调函数的数据
		 */
        request(sendData?: any, selfData?: any): void {
            if (!selfData)
                this.selfData = selfData;
            let sendStr:string = sendData;
            let index1:number = (sendStr.indexOf("="))+1;
            let index2:number = (sendStr.indexOf("&"));
            let apiName:string = sendStr.substring(index1,index2);
            this.http.send(this.url+apiName, sendData, this.sendDataType, this.receiveDataType);  // , this.reqHeader);     ,["Content-Type","application/json"]
        }

        private startHandler(msg: any): void {
            console.log("HttpService, start, msg:" + msg);
        }

        private closeHandler(msg: any): void {
            console.error("HttpService, close, msg:" + msg);
        }

        private httpErrorHandler(errMsg: string): void {
            console.error("HttpService, has error:" + errMsg);
        }

        private httpProgrssHandler(progrss: number): void {
            let proMsg: string;
            if (progrss)
                proMsg = progrss * 100 + "%";
            console.log("HttpService, progress is:" + proMsg);
        }

        private httpCompleteHandler(data: any): void {
            this.receiveData = this.http.data;
            console.info("HttpService, httpCompleteHandler, receive data:\n" + JSON.stringify(this.receiveData));

            if (typeof this.receiveData === "string")   
            {
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
            }else {  //返回失败
                    console.error("HttpService, msg:" + this.receiveData["status"]);
            }

        }

    }

}