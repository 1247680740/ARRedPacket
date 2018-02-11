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
    var Sprite = laya.display.Sprite;
    var Browser = laya.utils.Browser;
    var Texture = laya.resource.Texture;
    var PrizeView = /** @class */ (function (_super) {
        __extends(PrizeView, _super);
        function PrizeView(name) {
            var _this = _super.call(this) || this;
            _this.timeNum = 1;
            _this.sp = new Sprite();
            Laya.stage.addChild(_this);
            if (laya.utils.Browser.onAndriod) {
                _this.topBg.top = -16;
                _this.x = -2;
                _this.y = 16;
            }
            return _this;
            // this.tauch.on(Laya.Event.CLICK,this,this.changePage,[name]);
            // this.on(Laya.Event.MOUSE_DOWN, this, this.screenShot);
        }
        /** 切换页面（暂未用到） */
        PrizeView.prototype.changePage = function (name) {
            this.visible = false;
            Laya.stage.removeChild(this);
            var openView = new views.OpenView(name);
        };
        /** 截屏操作（暂未用到） */
        PrizeView.prototype.screenShot = function () {
            var _this = this;
            Laya.timer.loop(1000, this, function () {
                _this.timeNum++;
                if (_this.timeNum > 2) {
                    Laya.timer.clearAll(_this);
                    var htmlC = _this.drawToCanvas(Browser.width, Browser.height, 0, 0);
                    /** 获取截屏区域，及保存的图片base64信息 */
                    var canvas = htmlC.getCanvas();
                    var imgData = canvas.toDataURL();
                    /** 将图片信息传到服务器上 */
                    //将获取的截屏图片显示在舞台上
                    var _texture = new Texture(htmlC);
                    //将截屏的texture进行draw绘制并显示到舞台
                    var sp2 = new Sprite();
                    sp2.graphics.drawTexture(_texture, 0, 0, 700, 1000);
                    sp2.x = 10;
                    Laya.stage.addChild(sp2);
                }
            });
        };
        return PrizeView;
    }(ui.PrizePageUI));
    views.PrizeView = PrizeView;
})(views || (views = {}));
//# sourceMappingURL=PrizeView.js.map