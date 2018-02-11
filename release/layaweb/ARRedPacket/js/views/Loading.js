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
    var Handler = laya.utils.Handler;
    var LoadingUI = ui.LoadingUI;
    /**
     * 加载进度条
     */
    var Loading = /** @class */ (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            var _this = _super.call(this) || this;
            _this.handler = Handler.create(_this, _this.progChanged);
            Loading.instance = _this;
            _this.init();
            return _this;
        }
        Loading.prototype.init = function () {
            this.progressBar.sizeGrid = "5,5,5,5";
            this.progressBar.changeHandler = this.handler;
        };
        Loading.prototype.progChanged = function (progNum) {
            var _progNum = Math.floor(progNum * 100);
            this.progressTxt.text = "当前加载进度为：" + _progNum + "%";
            // ================= Android 使用 =================
            if (Laya.Browser.window.loadingView)
                Laya.Browser.window.loadingView.loading(_progNum);
            // console.log("==== Loading, progStr:"+_progNum+"%");
        };
        Loading.prototype.progressChanged = function (progNum) {
            Loading.instance.progressBar.value = progNum;
        };
        return Loading;
    }(LoadingUI));
    views.Loading = Loading;
})(views || (views = {}));
//# sourceMappingURL=Loading.js.map