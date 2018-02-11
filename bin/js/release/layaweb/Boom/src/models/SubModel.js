var models;
(function (models) {
    /**
     * 提交数据模型层
     */
    var SubModel = /** @class */ (function () {
        function SubModel() {
        }
        Object.defineProperty(SubModel, "instance", {
            get: function () {
                if (!SubModel._instance)
                    SubModel._instance = new SubModel();
                return SubModel._instance;
            },
            enumerable: true,
            configurable: true
        });
        /** name:奖励名称,nums:用户手机号 */
        SubModel.prototype.request_subInfo = function (name, nums) {
            HttpServiceProxy.request("addpacket.do", { "name": name, "nums": nums }, this.getResponseInfo);
        };
        /** 验证验证码 */
        SubModel.prototype.request_subCode = function (code) {
            HttpServiceProxy.request("checkcode.do", { "code": code }, this.getResponseCode);
        };
        SubModel.prototype.getResponseInfo = function (receiveData) {
            if (!receiveData)
                return;
            if (receiveData)
                this.receiveData = receiveData;
        };
        SubModel.prototype.getResponseCode = function (receiveData) {
            if (!receiveData)
                return;
            if (receiveData)
                this.receiveData = receiveData;
            var receObj = this.receiveData;
            var key;
            for (key in receObj) {
                if (receObj.hasOwnProperty("status")) {
                    var status_1 = receObj["status"];
                    if (status_1 == "ok") {
                        SubModel.instance.handleCallback(status_1);
                    }
                }
            }
        };
        SubModel.prototype.handleCallback = function (takeData) {
            if (SubModel.callback) {
                if (takeData)
                    SubModel.callback(takeData);
                else
                    SubModel.callback();
            }
        };
        return SubModel;
    }());
    models.SubModel = SubModel;
})(models || (models = {}));
//# sourceMappingURL=SubModel.js.map