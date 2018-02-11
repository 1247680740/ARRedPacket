var configs;
(function (configs) {
    var HttpServiceProxy = nets.HttpServiceProxy;
    /**
     * 通信配置信息（主要用于与服务器端做对接，指明要调用服务器的哪个Controller下的哪个函数）
     */
    var HttpConfig = /** @class */ (function () {
        function HttpConfig() {
        }
        /**
         * 设置通信服务基本配置（默认已在其内设置，通过不用重设参数）及初始化通信服务
         */
        HttpConfig.init = function (protocol, host, port, path) {
            protocol && (this.protocol = protocol);
            host && (this.host = host);
            port && (this.port = port);
            path && (this.path = path);
            // 初始化通信服务
            HttpServiceProxy.getInstance();
        };
        /**
         * api信息是否存在
         * @return
         */
        HttpConfig.isset = function (apiName) {
            if (HttpConfig._apiObject[apiName] == null)
                return false;
            return true;
        };
        /**
         * 获取api信息
         * @param apiName:string api名字
         * @return Object
         */
        HttpConfig.getSendData = function (apiName) {
            return HttpConfig.isset(apiName) == false ? null : this._apiObject[apiName].sendData;
        };
        /** 服务器已连接成功 */
        HttpConfig.SERVER_CONNECTED = "server_connected";
        /** 返回的数据格式 */
        HttpConfig.RESULT_FORMAT = 'json';
        /**
         * api配置信息,向服务端请求的方法配置表
         */
        HttpConfig._apiObject = {
            'subUserInfo': "addpacket.do",
        };
        return HttpConfig;
    }());
    configs.HttpConfig = HttpConfig;
})(configs || (configs = {}));
//# sourceMappingURL=HttpConfig.js.map