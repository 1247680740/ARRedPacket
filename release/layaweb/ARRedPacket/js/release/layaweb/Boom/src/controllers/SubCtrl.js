var controllers;
(function (controllers) {
    /** 提交获奖用户信息相关控制器 */
    var SubCtrl = /** @class */ (function () {
        function SubCtrl() {
            if (!SubCtrl.subModel)
                SubCtrl.subModel = models.SubModel.instance;
            // if(!SubCtrl.openView)
            // 	SubCtrl.openView = new OpenView(null);
        }
        SubCtrl.getInstance = function () {
            if (!SubCtrl._instance)
                SubCtrl._instance = new SubCtrl();
            return SubCtrl._instance;
        };
        SubCtrl.prototype.subInfo = function (name, nums) {
            SubCtrl.subModel.request_subInfo(name, nums);
        };
        SubCtrl.prototype.subCode = function (code) {
            models.SubModel.callback = this.setStatus;
            SubCtrl.subModel.request_subCode(code);
        };
        SubCtrl.prototype.setStatus = function (takeData) {
            views.OpenView.prototype.setStatus(takeData);
        };
        return SubCtrl;
    }());
    controllers.SubCtrl = SubCtrl;
})(controllers || (controllers = {}));
//# sourceMappingURL=SubCtrl.js.map