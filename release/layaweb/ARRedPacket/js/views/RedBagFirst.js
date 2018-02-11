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
    var RedBagFirst = /** @class */ (function (_super) {
        __extends(RedBagFirst, _super);
        function RedBagFirst(name) {
            var _this = _super.call(this) || this;
            _this.name = "firstView";
            if (laya.utils.Browser.onIOS) {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, _this, LayaAir3D.resetBG, [name]);
            }
            else {
                //    LayaAir3D.video.addEventListener('click', function(){
                //        LayaAir3D.resetBG(name);
                //    },true);  
                // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.resetBG, [name]);  //本地测试用
            }
            return _this;
        }
        return RedBagFirst;
    }(ui.RedBagFirstUI));
    views.RedBagFirst = RedBagFirst;
})(views || (views = {}));
//# sourceMappingURL=RedBagFirst.js.map