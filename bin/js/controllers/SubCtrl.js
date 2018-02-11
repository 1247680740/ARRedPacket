var controllers;
(function (controllers) {
    /** 提交获奖用户信息相关控制器 */
    var SubCtrl = /** @class */ (function () {
        function SubCtrl() {
            if (!SubCtrl.subModel)
                SubCtrl.subModel = models.SubModel.getInstance();
        }
        SubCtrl.getInstance = function () {
            if (!SubCtrl.instance)
                SubCtrl.instance = new SubCtrl();
            return SubCtrl.instance;
        };
        /** 提交用户手机号及奖品名称 */
        SubCtrl.prototype.subInfo = function (name, nums, firstname, sex, province, city) {
            SubCtrl.subModel.request_subInfo(name, nums, firstname, sex, province, city);
        };
        /** 提交验证码并验证 */
        SubCtrl.prototype.subCode = function (code) {
            SubCtrl.subModel.request_subCode(code);
        };
        /** 获取省份对应城市 */
        SubCtrl.prototype.getCity = function (index) {
            SubCtrl.subModel.request_city(index);
        };
        return SubCtrl;
    }());
    controllers.SubCtrl = SubCtrl;
})(controllers || (controllers = {}));
//# sourceMappingURL=SubCtrl.js.map