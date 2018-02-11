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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var mainUIUI = /** @class */ (function (_super) {
        __extends(mainUIUI, _super);
        function mainUIUI() {
            return _super.call(this) || this;
        }
        mainUIUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.mainUIUI.uiView);
        };
        mainUIUI.uiView = { "type": "View", "props": { "width": 600, "height": 800, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 88, "skin": "imgs/post.png", "height": 88, "centerY": 0, "centerX": 0 } }] };
        return mainUIUI;
    }(View));
    ui.mainUIUI = mainUIUI;
})(ui || (ui = {}));
(function (ui) {
    var RedBagFirstUI = /** @class */ (function (_super) {
        __extends(RedBagFirstUI, _super);
        function RedBagFirstUI() {
            return _super.call(this) || this;
        }
        RedBagFirstUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.RedBagFirstUI.uiView);
        };
        RedBagFirstUI.uiView = { "type": "View", "props": { "width": 600, "height": 800, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 523, "skin": "imgs/red.png", "height": 706, "centerY": 0, "centerX": 1 } }] };
        return RedBagFirstUI;
    }(View));
    ui.RedBagFirstUI = RedBagFirstUI;
})(ui || (ui = {}));
(function (ui) {
    var RedBagOpenUI = /** @class */ (function (_super) {
        __extends(RedBagOpenUI, _super);
        function RedBagOpenUI() {
            return _super.call(this) || this;
        }
        RedBagOpenUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.RedBagOpenUI.uiView);
        };
        RedBagOpenUI.uiView = { "type": "View", "props": { "width": 600, "height": 800, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 605, "skin": "imgs/yellow.png", "height": 1076, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 606, "top": -47, "skin": "imgs/blank.png", "left": 0, "height": 77 } }, { "type": "Image", "props": { "width": 148, "top": -24, "skin": "imgs/tittle.png", "height": 36, "centerX": 8, "anchorX": 143 } }, { "type": "Image", "props": { "skin": "imgs/logo.png", "centerY": -50, "centerX": -10, "anchorX": 193 } }, { "type": "Image", "props": { "skin": "imgs/10.png", "centerY": 150, "centerX": -4 } }, { "type": "Button", "props": { "y": 774, "width": 229, "var": "submit", "stateNum": 1, "skin": "imgs/sub1.png", "name": "submit", "mouseThrough": true, "mouseEnabled": true, "height": 73, "centerX": 5 } }, { "type": "TextInput", "props": { "y": 672, "width": 147, "var": "phoneNum", "type": "number", "skin": "imgs/textinput.png", "promptColor": "#493c3b", "name": "phoneNum", "maxChars": 11, "height": 38, "fontSize": 18, "font": "Microsoft YaHei", "color": "#000000", "centerX": 23, "align": "center" } }, { "type": "TextInput", "props": { "y": 717, "x": 250, "width": 89, "var": "numCode", "valign": "middle", "type": "number", "skin": "imgs/textinput.png", "promptColor": "#4a3b3a", "prompt": "输入验证码", "overflow": "hidden", "name": "numCode", "height": 38, "fontSize": 13, "font": "Arial", "align": "center" } }, { "type": "Button", "props": { "y": 719, "x": 360, "width": 82, "var": "codeBtn", "skin": "imgs/button.png", "pivotX": 13, "name": "codeBtn", "labelAlign": "center", "label": "获取验证码", "height": 33 } }, { "type": "Button", "props": { "y": -38, "x": 6, "width": 74, "var": "backBtn", "stateNum": 1, "skin": "imgs/1.png", "name": "backBtn", "height": 63 } }, { "type": "Label", "props": { "y": 721, "x": 170, "width": 70, "text": "验证码：", "height": 24, "fontSize": 20, "font": "Arial", "color": "#7d6d6d", "bold": false } }, { "type": "Label", "props": { "y": 682, "x": 170, "width": 70, "text": "手机号:", "height": 24, "fontSize": 20, "font": "Helvetica", "color": "#7d6d6d", "bold": false } }] };
        return RedBagOpenUI;
    }(View));
    ui.RedBagOpenUI = RedBagOpenUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map