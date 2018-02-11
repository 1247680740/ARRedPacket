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
    var OpenView = /** @class */ (function (_super) {
        __extends(OpenView, _super);
        function OpenView(name) {
            var _this = _super.call(this) || this;
            _this.myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
            _this.flag = false;
            _this.message = "";
            _this.name = "openView";
            Laya.stage.addChild(_this);
            if (laya.utils.Browser.onAndriod) {
                laya.utils.Browser.document.body.removeChild(LayaAir3D.video);
            }
            _this.codeBtn.on(Laya.Event.CLICK, _this, _this.removeAll, [name]);
            _this.submit.on(Laya.Event.CLICK, _this, _this.submitCode);
            _this.backBtn.on(Laya.Event.CLICK, _this, _this.test);
            return _this;
        }
        OpenView.prototype.removeAll = function (name) {
            LayaAir3D.giftOpen = false;
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
                this.flag = true;
                this.timerLoop(1000, this, this.timeBack);
                subCtrl.getInstance().subInfo(name, this.phoneNums);
            }
        };
        OpenView.prototype.alertMessage = function (mesage) {
            if (mesage != "") {
                alert(mesage);
            }
        };
        OpenView.prototype.submitCode = function () {
            var code = this.numCode.text;
            subCtrl.getInstance().subCode(code);
        };
        OpenView.prototype.backRoom = function () {
            alert("返回主页面");
            LayaAir3D.giftOpen = false;
            Laya.stage.removeChild(this);
            Laya.stage.off(Laya.Event.CLICK, this, this.removeAll);
            if (Laya.Browser.onAndriod) {
                laya.utils.Browser.document.body.appendChild(LayaAir3D.video);
            }
        };
        OpenView.prototype.timeBack = function () {
            this.codeBtn.label = "";
            var timer = 60;
            timer--;
            if (timer > 0) {
                this.codeBtn.label = timer + "";
                this.codeBtn.mouseEnabled = false;
            }
            else {
                Laya.timer.clearAll(this);
                this.codeBtn.label = "获取验证码";
                this.codeBtn.mouseEnabled = true;
            }
        };
        OpenView.prototype.setStatus = function (takeData) {
            var status = takeData;
            if (status == "ok") {
                this.removeSelf();
                Laya.stage.removeChildByName("openView");
                Laya.stage.removeChild(this);
                laya.utils.Browser.document.body.appendChild(LayaAir3D.video);
                // Laya.stage.off(Laya.Event.CLICK, this, this.removeAll);
                LayaAir3D.prototype.init();
                if (laya.utils.Browser.onAndriod) {
                    LayaAir3D.video.addEventListener('click', LayaAir3D.prototype.onShoot, true);
                    // Laya.stage.on(Laya.Event.CLICK, this, LayaAir3D.prototype.onShoot);
                }
                else if (laya.utils.Browser.onIOS) {
                    LayaAir3D.video.addEventListener('click', LayaAir3D.prototype.onShoot, true);
                    Laya.stage.on(Laya.Event.CLICK, this, LayaAir3D.prototype.onShoot);
                }
                else {
                    LayaAir3D.video.addEventListener('click', LayaAir3D.prototype.onShoot, true);
                    Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.prototype.onShoot);
                }
            }
        };
        OpenView.prototype.test = function (event) {
            alert(event.target.name + "：" + typeof (event.target));
            this.removeSelf();
            Laya.stage.removeChildByName("openView");
            Laya.stage.removeChild(this);
            Laya.stage.off(Laya.Event.CLICK, this, this.removeAll);
            LayaAir3D.prototype.init();
            // LayaAir3D.prototype.openCamera();
            // Laya.stage.mouseEnabled = true;
            // Laya.stage.mouseThrough = true;
            // laya.utils.Browser.document.body.appendChild(LayaAir3D.video);
            // if (laya.utils.Browser.onAndriod) {
            //     LayaAir3D.video.addEventListener('click', LayaAir3D.prototype.onShoot, true);
            //     // Laya.stage.on(Laya.Event.CLICK, this, LayaAir3D.prototype.onShoot);
            //     alert("消除自己");
            // } else if (laya.utils.Browser.onIOS) {
            //     LayaAir3D.video.addEventListener('click', LayaAir3D.prototype.onShoot, true);
            //     Laya.stage.on(Laya.Event.CLICK, this, LayaAir3D.prototype.onShoot);
            //     alert("消除自己");
            // } else {
            //     LayaAir3D.video.addEventListener('click', LayaAir3D.prototype.onShoot, true);
            //     Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.prototype.onShoot);
            //     alert("消除自己");
            // }
        };
        return OpenView;
    }(ui.RedBagOpenUI));
    views.OpenView = OpenView;
})(views || (views = {}));
//# sourceMappingURL=OpenView.js.map