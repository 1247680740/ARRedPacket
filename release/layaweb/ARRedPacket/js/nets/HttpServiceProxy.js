var nets;
(function (nets) {
    /**
     * 通信服务的代理
     */
    var HttpServiceProxy = /** @class */ (function () {
        function HttpServiceProxy(interCls) {
            if (interCls === null || interCls instanceof InternalClass === false)
                throw new Error("HttpServiceProxy is singleton, not allow to use constructor!");
        }
        HttpServiceProxy.getInstance = function () {
            if (this.instance === undefined)
                this.instance = new HttpServiceProxy(new InternalClass());
            this._apiRecord = {};
            this.httpService = new nets.HttpService();
            this.httpService.init(HttpConfig.host, HttpConfig.port, HttpConfig.path);
            this.httpService.callback = this.callback;
            return this.instance;
        };
        /**
         * 发送请求
         * 调用API接口并自定义回调函数获取结果,发送数据的格式为 {'数据名称':'数据值'}
         * @param apiName:String API名字
         * @param paramData:Object 要传递给API端的数据
         * @param callback:Function 回调函数
         * @param selfData:any 回调函数的数据
         */
        HttpServiceProxy.request = function (apiName, _sendData, callback, selfData) {
            //解析api信息
            var sendData = new Object();
            sendData["_api"] = this.saveApiRecord(apiName, callback, selfData);
            if (_sendData != null) {
                var index;
                for (index in _sendData) {
                    sendData[index] = _sendData[index];
                }
            }
            /** sendData：包含API名称，奖品名称，手机号，姓名，性别，省份，城市 */
            this.httpService.request(this.handleJsonObject(sendData));
        };
        /** 将JSON数据处理成 LayaAir 中能正常使用的 key=value&key=value... 样式。*/
        HttpServiceProxy.handleJsonObject = function (jsonObj) {
            if (!jsonObj)
                return "";
            var tarStr = "", tarStrArr = [], tempStr = JSON.stringify(jsonObj);
            tempStr = tempStr.slice(1, tempStr.length - 1);
            tarStrArr = tempStr.split(",");
            var i = 0, arrLen = tarStrArr.length;
            var tempEle = "", tempEleArr = [];
            for (var i_1 = 0; i_1 < arrLen; i_1++) {
                tempEle = tarStrArr[i_1];
                tempEleArr = tempEle.split(":");
                tarStr += tempEleArr[0] + "=" + tempEleArr[1];
                if (i_1 < arrLen - 1)
                    tarStr += "&";
            }
            tarStr = tarStr.replace(/"/g, '');
            return tarStr;
        };
        /**
         * 存储记录
         * @param apiName
         * @param callback
         * @param selfData
         */
        HttpServiceProxy.saveApiRecord = function (apiName, callback, selfData) {
            var recordKey = apiName;
            this._apiRecord[recordKey] = { 'callback': callback, 'takeData': selfData };
            return recordKey;
        };
        /**
         * 注册的回调函数
         */
        HttpServiceProxy.callback = function (receiveData) {
            console.info("HttpServiceProxy, 响应回调成功...");
            if (!receiveData)
                return;
            if (!receiveData.hasOwnProperty("_api"))
                return;
            var recordKey = receiveData._api;
            if (recordKey != null && HttpServiceProxy._apiRecord[recordKey] != null) {
                var callback = HttpServiceProxy._apiRecord[recordKey]['callback'];
                var takeData = HttpServiceProxy._apiRecord[recordKey]['takeData'];
                if (callback !== null) {
                    if (takeData === null) {
                        callback(receiveData);
                    }
                    else {
                        callback(receiveData, takeData);
                    }
                }
                //清空记录
                HttpServiceProxy._apiRecord[recordKey]['callback'] = null;
                HttpServiceProxy._apiRecord[recordKey]['takeData'] = null;
                HttpServiceProxy._apiRecord[recordKey] = null;
                delete HttpServiceProxy._apiRecord[recordKey];
            }
        };
        return HttpServiceProxy;
    }());
    nets.HttpServiceProxy = HttpServiceProxy;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(nets || (nets = {}));
//# sourceMappingURL=HttpServiceProxy.js.map