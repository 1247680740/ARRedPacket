var views;
(function (views) {
    var textView = /** @class */ (function () {
        function textView(name) {
            //初始化引擎
            this.vec3 = new Laya.Vector3(5, 2, 3);
            Laya.stage.removeChildByName("gameUI");
            this.onCreateComplete(name);
        }
        textView.prototype.onCreateComplete = function (name) {
            //实例化加载并创建好的3D对象
            this.sprite3D = Laya.loader.getRes("res/LayaDog/minidog.lh");
            this.sprite3D.transform.rotate(new Laya.Vector3(0, 360, 0));
            this.sprite3D.transform.translate(new Laya.Vector3(0, -5, -5));
            this.sprite3D.transform.localScale = new Laya.Vector3(20, 20, 20);
            GameConfig.mainCamera.transform.lookAt(this.sprite3D.transform.position, new Laya.Vector3(2, 2, 1), true);
            GameConfig.mainScene.addChild(this.sprite3D);
            GameConfig.ani.play("A_run");
            if (name == "福袋") {
                this.giftOBj = Laya.Sprite3D.load("res/fudai/fudai.lh");
                this.giftOBj.name = "bag";
                this.test(this.giftOBj);
                Laya.timer.once(1600, this, this.changeAni, [this.sprite3D, name, this.giftOBj.name]);
            }
            else if (name == "盒子") {
                this.giftOBj = Laya.Sprite3D.load("res/gift/gift.lh");
                this.giftOBj.name = "box";
                this.test(this.giftOBj);
                Laya.timer.once(1600, this, this.changeAni, [this.sprite3D, name, this.giftOBj.name]);
            }
            else if (name == "红包") {
                this.giftOBj = Laya.Sprite3D.load("res/paket/paket.lh");
                this.giftOBj.name = "redBag";
                this.test(this.giftOBj);
                Laya.timer.once(1600, this, this.changeAni, [this.sprite3D, name, this.giftOBj.name]);
            }
        };
        textView.prototype.test = function (obj) {
            GameConfig.mainScene.addChild(obj);
            obj.transform.position = this.vec3;
            obj.transform.rotate(new Laya.Vector3(0, -90, 0));
            obj.transform.localScale = new Laya.Vector3(10, 10, 10);
            Laya.timer.frameLoop(1, this, this.translatePos, [obj]);
            Laya.timer.once(100, this, this.animate, [obj]);
        };
        textView.prototype.translatePos = function (obj) {
            obj.transform.position = this.vec3;
        };
        textView.prototype.changeAni = function (sp, name, objName) {
            GameConfig.ani.play("A_jump");
            Laya.timer.once(1000, this, this.completeAni, [name, objName]);
        };
        textView.prototype.animate = function (obj) {
            Laya.Tween.to(obj.transform.position, { x: this.sprite3D.transform.position.x, y: this.sprite3D.transform.position.y, z: this.sprite3D.transform.position.z }, 5000);
        };
        textView.prototype.completeAni = function (name, objName) {
            GameConfig.mainScene.removeChild(this.sprite3D);
            GameConfig.mainScene.removeChildByName(objName);
            if (!GameConfig.mainScene.getChildByName(objName)) {
                alert("删除成功");
            }
            else {
                alert("还存在");
            }
            LayaAir3D.giftUI(name);
        };
        return textView;
    }());
    views.textView = textView;
})(views || (views = {}));
//# sourceMappingURL=textView.js.map