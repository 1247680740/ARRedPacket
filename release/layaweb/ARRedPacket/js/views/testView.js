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
    /*角色装备UI界面（包括3D场景与角色）*/
    var testView = /** @class */ (function (_super) {
        __extends(testView, _super);
        function testView() {
            var _this = _super.call(this) || this;
            /*界面中在舞台水平居中位置*/
            _this.xx = 0;
            /*界面中在舞台垂直居中位置*/
            _this.yy = 0;
            alert("添加进来了");
            //与UI搭配的3D场景
            _this.UIScene = new Laya.Scene();
            _this.addChild(_this.UIScene);
            //创建角色
            _this.role = Laya.loader.getRes("res/LayaDog/minidog.lh");
            _this.UIScene.addChild(_this.role);
            //修改角色位置（超出摄像机视口后将不会显示）
            _this.role.transform.translate(new Laya.Vector3(0, 0, 0), false);
            //创建摄像机
            _this.camera = new Laya.Camera();
            _this.UIScene.addChild(_this.camera);
            //设置摄像机视口大小与UI一致
            _this.camera.viewport = new Laya.Viewport(_this.xx, _this.yy, _this.width, _this.height);
            //摄像机位置
            _this.camera.transform.translate(new Laya.Vector3(0, 1.2, 3), false);
            return _this;
        }
        return testView;
    }(ui.RolePropUIUI));
    views.testView = testView;
})(views || (views = {}));
//# sourceMappingURL=testView.js.map