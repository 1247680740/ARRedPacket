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
        function RedBagFirst() {
            var _this = _super.call(this) || this;
            _this.name = "firstView";
            Laya.stage.addChild(_this);
            _this.mouseThrough = true;
            _this.mouseEnabled = true;
            _this.on(Laya.Event.CLICK, _this, _this.removeSelf);
            Laya.stage.on(Laya.Event.CLICK, _this, _this.removeAll);
            return _this;
        }
        RedBagFirst.prototype.removeAll = function () {
            Laya.stage.removeChild(LayaAir3D.firstView);
        };
        return RedBagFirst;
    }(ui.RedBagFirstUI));
    views.RedBagFirst = RedBagFirst;
})(views || (views = {}));
//# sourceMappingURL=RedBagFirst.js.map