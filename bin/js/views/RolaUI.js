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
    var RolaUI = /** @class */ (function (_super) {
        __extends(RolaUI, _super);
        function RolaUI(name) {
            var _this = _super.call(this) || this;
            //初始化引擎
            _this.visible = true;
            Laya.stage.removeChildByName("gameUI");
            Laya.stage.addChild(_this);
            _this.vec3 = new Laya.Vector3(0, 3, -2);
            _this.scene = new Laya.Scene();
            _this.addChild(_this.scene);
            //添加照相机
            _this.camera = (_this.scene.addChild(new Laya.Camera(0, 1, 100)));
            _this.camera.transform.translate(new Laya.Vector3(0, 1.2, 3), false);
            //添加方向光
            var directionLight = _this.scene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.direction = new Laya.Vector3(1, -1, 0);
            _this.onCreateComplete(name);
            return _this;
        }
        RolaUI.prototype.onCreateComplete = function (name) {
            //实例化加载并创建好的3D对象
            this.role = Laya.Sprite3D.load("res/LayaDog/minidog.lh");
            this.role.transform.rotate(new Laya.Vector3(0, -180, 0), true, false);
            this.role.transform.translate(new Laya.Vector3(0, 0, 0), false);
            this.scene.addChild(this.role);
            var ani = this.role.getChildAt(0)["_components"][0];
            ani.play("A_run");
            if (name == "福袋") {
                var gift01 = Laya.Sprite3D.load("res/fudai/fudai.lh");
                this.test(gift01);
                Laya.timer.once(1600, this, this.changeAni, [this.role, name]);
            }
            else if (name == "盒子") {
                var gift02 = Laya.Sprite3D.load("res/gift/gift.lh");
                this.test(gift02);
                Laya.timer.once(1600, this, this.changeAni, [this.role, name]);
            }
            else if (name == "红包") {
                var gift03 = Laya.Sprite3D.load("res/paket/paket.lh");
                this.test(gift03);
                Laya.timer.once(1600, this, this.changeAni, [this.role, name]);
                this.completeAni(name);
            }
        };
        RolaUI.prototype.test = function (obj) {
            this.scene.addChild(obj);
            obj.transform.position = this.vec3;
            obj.transform.localScale = new Laya.Vector3(5, 5, 5);
            Laya.timer.frameLoop(1, this, this.translatePos, [obj]);
            Laya.timer.once(100, this, this.animate, [obj]);
        };
        RolaUI.prototype.translatePos = function (obj) {
            obj.transform.position = this.vec3;
        };
        RolaUI.prototype.changeAni = function (sp, name) {
            var ani = sp.getChildAt(0)["_components"][0];
            ani.play("A_jump");
            alert("跳跃了");
            Laya.timer.once(1000, this, this.completeAni, [name]);
        };
        RolaUI.prototype.animate = function (obj) {
            Laya.Tween.to(obj.transform.position, { x: this.role.transform.position.x, y: this.role.transform.position.y, z: this.role.transform.position.z }, 5000);
        };
        RolaUI.prototype.completeAni = function (name) {
            alert("切换场景了");
            Laya.stage.removeChild(this);
            LayaAir3D.scene.visible = true;
            LayaAir3D.giftUI(name);
        };
        return RolaUI;
    }(ui.SceneLayerUIUI));
    views.RolaUI = RolaUI;
})(views || (views = {}));
//# sourceMappingURL=RolaUI.js.map