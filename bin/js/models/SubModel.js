var models;
(function (models) {
    /**
     * 提交数据模型层
     */
    var SubModel = /** @class */ (function () {
        function SubModel() {
        }
        SubModel.getInstance = function () {
            if (!SubModel.instance)
                SubModel.instance = new SubModel();
            return SubModel.instance;
        };
        /** name:奖励名称,nums:用户手机号,firstname:用户名,sex:用户性别,province:用户所在省份,city:用户所在城市 */
        SubModel.prototype.request_subInfo = function (name, nums, firstname, sex, province, city) {
            HttpServiceProxy.request("addpacket.do", { "name": name, "nums": nums, "firstname": firstname, "sex": sex, "province": province, "city": city }, this.getResponseInfo, { "phone": nums });
        };
        /** 验证验证码 */
        SubModel.prototype.request_subCode = function (code) {
            HttpServiceProxy.request("checkcode.do", { "code": code }, this.getResponseCode);
        };
        /** 获取省份对应城市 */
        SubModel.prototype.request_city = function (index) {
            HttpServiceProxy.request("queryCity.do", { "pid": index }, this.getCityList);
        };
        SubModel.prototype.getResponseInfo = function (receiveData, takeData) {
            if (!receiveData)
                return;
            if (receiveData)
                this.receiveData = receiveData;
            this.takeData = takeData;
            if (this.receiveData['status'] == "ok") {
                var phoneNum = this.takeData['phone'];
                GameConfig.prizeNum = phoneNum;
                laya.net.LocalStorage.setItem("phone", phoneNum);
            }
        };
        SubModel.prototype.getResponseCode = function (receiveData) {
            if (!receiveData)
                return;
            if (receiveData)
                this.receiveData = receiveData;
            var receObj = this.receiveData;
            GameConfig.status = receObj["status"];
        };
        SubModel.prototype.getCityList = function (receiveData) {
            if (!receiveData)
                return;
            if (receiveData)
                this.receiveData = receiveData;
            var getOBJ = this.receiveData;
            var cityOBJ;
            this.cityStr = "";
            var str;
            if (getOBJ['status'] === "ok") {
                this.cityArr = getOBJ['content'];
                for (var i = 0; i < this.cityArr.length; i++) {
                    cityOBJ = this.cityArr[i];
                    str = cityOBJ['name'] + ",";
                    this.cityStr = this.cityStr + str;
                }
            }
            this.cityStr = this.cityStr.substring(0, this.cityStr.length - 1);
            console.log(this.cityStr);
            GameConfig.cityStr = this.cityStr;
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