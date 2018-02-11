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
var views;
(function (views) {
    var subCtrl = controllers.SubCtrl;
    var GameMain = views.GameMain;
    var OpenView = /** @class */ (function (_super) {
        __extends(OpenView, _super);
        function OpenView(name) {
            var _this = _super.call(this) || this;
            _this.flag = false;
            _this.message = "";
            _this.myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
            if (laya.utils.Browser.onAndriod) {
                _this.topBg.top = -80;
            }
            else if (laya.utils.Browser.onIOS) {
                _this.topBg.top = -50;
            }
            _this.timeNum = 60;
            _this.name = "openView";
            Laya.stage.addChild(_this);
            _this.x = 0;
            _this.province.on(Laya.Event.CHANGE, _this, _this.getCityList);
            _this.cityList.on(Laya.Event.CHANGE, _this, _this.changeColor);
            _this.submit.on(Laya.Event.MOUSE_DOWN, _this, _this.subUserInfo, [name]); //提交用户信息
            return _this;
        }
        /** 提交信息，获取验证码 */
        OpenView.prototype.subUserInfo = function (name) {
            if (this.userName.text == "" || this.radioCheck.selectedIndex == -1 || this.province.selectedLabel == "请选择省份" || this.cityList.selectedLabel == "城市" || this.phoneNum.text == "") {
                alert("信息还未填写完整！");
                return;
            }
            else {
                if (this.phoneNum.text == laya.net.LocalStorage.getItem("phone")) {
                    alert("你已经提交过信息了！");
                    return;
                }
                else {
                    this.phoneNums = this.phoneNum.text;
                    if (this.phoneNums == "") {
                        this.message = "手机号码不能为空！";
                        this.alertMessage(this.message);
                    }
                    else if (this.phoneNums.length != 11) {
                        this.message = "请输入11位手机号码！";
                        this.alertMessage(this.message);
                    }
                    else if (!this.myreg.test(this.phoneNums)) {
                        this.message = "请输入有效的手机号码！";
                        this.alertMessage(this.message);
                    }
                    else {
                        this.firstname = this.userName.text;
                        if (this.radioCheck.selectedIndex == 0) {
                            this.sex = "先生";
                        }
                        else {
                            this.sex = "女士";
                        }
                        this.flag = true;
                        subCtrl.getInstance().subInfo(name, this.phoneNums, this.firstname, this.sex, this.province.selectedLabel, this.cityList.selectedLabel);
                        this.changePage(name);
                    }
                }
            }
        };
        /** 报错信息提示 */
        OpenView.prototype.alertMessage = function (mesage) {
            if (mesage != "") {
                alert(mesage);
            }
        };
        /** 获取城市列表 */
        OpenView.prototype.getCityList = function () {
            if (this.province.selectedLabel == "请选择省份") {
                this.cityList.labels = "城市";
                this.cityList.selectedIndex = 0;
            }
            else {
                this.province.labelColors = "#ffffff,#c3acaa,#c3acaa,#c3acaa";
                var index = this.province.selectedIndex;
                subCtrl.getInstance().getCity(index);
                Laya.timer.once(1000, this, function () {
                    this.cityList.labels = GameConfig.cityStr;
                    this.cityList.selectedIndex = 0;
                });
            }
        };
        /** 切换页面 */
        OpenView.prototype.changePage = function (name) {
            this.visible = false;
            Laya.stage.removeChild(this);
            var prizeView = new views.PrizeView(name);
        };
        /** 改变颜色 */
        OpenView.prototype.changeColor = function () {
            this.cityList.labelColors = "#ffffff,#c3acaa,#c3acaa,#c3acaa";
        };
        /** 回到主页面（暂未用到） */
        OpenView.prototype.resetPage = function () {
            GameConfig.cityStr = "";
            this.cityList.labels = "";
            this.visible = false;
            Laya.stage.removeChild(this);
            if (Laya.stage.getChildByName("gameUI")) {
                console.log("已经有瞄准镜了");
                return;
            }
            else {
                var gameMain = new GameMain();
                gameMain.name = "gameUI";
                Laya.stage.addChild(gameMain);
            }
            LayaAir3D.prototype.openCamera();
            GameConfig.mainCamera.addComponent(VRCameraMoveScript);
            Laya.timer.once(1000, this, function () {
                GameConfig.isShoot = false;
                GameConfig.giftOpen = false;
            });
        };
        return OpenView;
    }(ui.RedBagOpenUI));
    views.OpenView = OpenView;
})(views || (views = {}));
//# sourceMappingURL=OpenView.js.map