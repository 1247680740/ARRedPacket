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
    var PrizePageUI = /** @class */ (function (_super) {
        __extends(PrizePageUI, _super);
        function PrizePageUI() {
            return _super.call(this) || this;
        }
        PrizePageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.PrizePageUI.uiView);
        };
        PrizePageUI.uiView = { "type": "View", "props": { "width": 600, "height": 800 }, "child": [{ "type": "Image", "props": { "width": 605, "skin": "imgs/bg.png", "height": 1076, "centerY": 2, "centerX": 4 } }, { "type": "Label", "props": { "y": 710, "width": 576, "text": "请至前台处领取红包", "height": 37, "fontSize": 30, "font": "Helvetica", "color": "#ffffff", "centerX": 0, "bold": false, "align": "center" } }, { "type": "Box", "props": { "var": "topBg", "name": "topBg" }, "child": [{ "type": "Image", "props": { "width": 608, "skin": "imgs/di.png", "height": 129 } }, { "type": "Image", "props": { "y": 27, "x": 333, "skin": "imgs/logo_text.png" } }, { "type": "Image", "props": { "y": 20, "x": 101, "skin": "imgs/theLogo.png" } }] }, { "type": "Image", "props": { "width": 371, "skin": "imgs/packet.png", "height": 362, "centerY": 16, "centerX": 0 } }] };
        return PrizePageUI;
    }(View));
    ui.PrizePageUI = PrizePageUI;
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
        RedBagOpenUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 600, "height": 800, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 605, "skin": "imgs/bg.png", "height": 1076, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "y": 137, "width": 431, "skin": "imgs/centerBg.png", "height": 665, "centerX": 0 } }, { "type": "Image", "props": { "y": 143, "width": 431, "skin": "imgs/tishi.png", "height": 60, "centerX": 0 } }, { "type": "Image", "props": { "y": 233, "x": 184, "skin": "imgs/name.png" } }, { "type": "Image", "props": { "y": 376, "x": 182, "skin": "imgs/phone.png" } }, { "type": "Button", "props": { "y": 663, "width": 243, "var": "submit", "stateNum": 1, "skin": "imgs/sub.png", "name": "submit", "mouseThrough": true, "mouseEnabled": true, "height": 58.5, "centerX": 0 } }, { "type": "TextInput", "props": { "y": 216, "width": 270, "var": "userName", "type": "text", "skin": "imgs/input.png", "promptColor": "#c3acaa", "prompt": "姓氏", "name": "userName", "height": 61, "fontSize": 25, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" } }, { "type": "RadioGroup", "props": { "y": 309, "width": 251, "var": "radioCheck", "space": 55, "skin": "comp/radio.png", "name": "radioCheck", "labels": "先生,女士", "labelStroke": 1, "labelSize": 25, "labelPadding": "-6,2,2,6", "labelFont": "Helvetica", "labelColors": "#7d6d6d,#7d6d6d,#ffffff,#7d6d6d", "labelAlign": "left", "height": 55, "centerX": 25 } }, { "type": "TextInput", "props": { "y": 362, "width": 270, "var": "phoneNum", "type": "number", "skin": "imgs/input.png", "promptColor": "#c3acaa", "prompt": "手机号码", "name": "phoneNum", "maxChars": 11, "height": 61, "fontSize": 25, "font": "Microsoft YaHei", "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" } }, { "type": "ComboBox", "props": { "y": 459, "width": 270, "visibleNum": 8, "var": "province", "skin": "imgs/111.png", "sizeGrid": "4,20,4,4", "selectedIndex": 0, "scrollBarSkin": "comp/vscroll.png", "name": "province", "labels": "请选择省份,北京市,天津市,上海市,重庆市,河北省,山西省,台湾省,辽宁省,吉林省,黑龙江省,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,甘肃省,四川省,贵州省,海南省,云南省,青海省,陕西省,广西壮族自治区,西藏自治区,宁夏回族自治区,新疆维吾尔族自治区,内蒙古自治区,澳门特别行政区,香港特别行政区", "labelSize": 25, "labelFont": "Helvetica", "labelColors": "#c3acaa,#c3acaa,#c3acaa,#c3acaa", "labelBold": true, "itemSize": 32, "itemColors": "#7d6d6d,#7d6d6d,#7d6d6d,#7d6d6d", "height": 61, "centerX": 0 } }, { "type": "ComboBox", "props": { "y": 557, "width": 270, "visibleNum": 5, "var": "cityList", "skin": "imgs/111.png", "sizeGrid": "4,20,4,4", "selectedIndex": 0, "scrollBarSkin": "comp/vscroll.png", "name": "cityList", "labels": "城市", "labelSize": 25, "labelFont": "Helvetica", "labelColors": "#c3acaa,#c3acaa,#c3acaa,#c3acaa", "labelBold": true, "itemSize": 32, "itemColors": "#7d6d6d,#7d6d6d,#7d6d6d,#7d6d6d", "height": 61, "centerX": 0 } }, { "type": "Box", "props": { "x": -3, "var": "topBg", "name": "topBg" }, "child": [{ "type": "Image", "props": { "width": 608, "skin": "imgs/di.png", "height": 129 } }, { "type": "Image", "props": { "y": 27, "x": 333, "skin": "imgs/logo_text.png" } }, { "type": "Image", "props": { "y": 20, "x": 101, "skin": "imgs/theLogo.png" } }] }] };
        return RedBagOpenUI;
    }(View));
    ui.RedBagOpenUI = RedBagOpenUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map