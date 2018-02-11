var views;
(function (views) {
    var SceneLayer = /** @class */ (function () {
        function SceneLayer(name) {
            GameConfig.shootNums = 0;
            this.vec3 = new Laya.Vector3(0, 5, 6);
            Laya.stage.removeChildByName("gameUI");
            this.onCreateComplete(name);
        }
        SceneLayer.prototype.onCreateComplete = function (name) {
            //创建第二个相机
            GameConfig.mainCamera.viewport = new Laya.Viewport(0, 0, 0, 0);
            GameConfig.mainCamera.fieldOfView = 0;
            this.camera2 = new Laya.Camera();
            this.camera2.viewport = new Laya.Viewport(0, 0, 600, 800);
            this.camera2.transform.rotate(new Laya.Vector3(-10, -180, 0), false, false);
            this.camera2.transform.translate(new Laya.Vector3(0, 2, 0), true);
            this.camera2.fieldOfView = 90;
            GameConfig.mainScene.addChild(this.camera2);
            GameConfig.dogPos = new Laya.Vector3(0, -4, 6);
            GameConfig.layaDog.transform.position = GameConfig.dogPos;
            GameConfig.ani.play("A_run");
            if (name == "福袋") {
                this.giftOBj = Laya.Sprite3D.load("res/fudai/fudai.lh");
                this.giftOBj.name = "bag";
                this.gather(this.giftOBj);
                Laya.timer.once(2000, this, this.changeAni, [name, this.giftOBj.name]);
            }
            else if (name == "盒子") {
                this.giftOBj = Laya.Sprite3D.load("res/gift/gift.lh");
                this.giftOBj.name = "box";
                this.gather(this.giftOBj);
                Laya.timer.once(2000, this, this.changeAni, [name, this.giftOBj.name]);
            }
            else if (name == "红包") {
                this.giftOBj = Laya.Sprite3D.load("res/paket/paket.lh");
                this.giftOBj.name = "redBag";
                this.gather(this.giftOBj);
                Laya.timer.once(2000, this, this.changeAni, [name, this.giftOBj.name]);
            }
        };
        SceneLayer.prototype.gather = function (obj) {
            GameConfig.mainScene.addChild(obj);
            obj.transform.position = this.vec3;
            obj.transform.rotate(new Laya.Vector3(0, -90, 0));
            obj.transform.localScale = new Laya.Vector3(12, 12, 12);
            Laya.timer.frameLoop(1, this, this.translatePos, [obj]);
            Laya.timer.once(100, this, this.animate, [obj]);
        };
        SceneLayer.prototype.translatePos = function (obj) {
            obj.transform.position = this.vec3;
        };
        SceneLayer.prototype.changeAni = function (name, objName) {
            GameConfig.ani.play("A_jump");
            Laya.timer.once(1000, this, this.completeAni, [name, objName]);
        };
        SceneLayer.prototype.animate = function (obj) {
            Laya.Tween.to(obj.transform.position, { x: GameConfig.layaDog.transform.position.x, y: GameConfig.layaDog.transform.position.y, z: GameConfig.layaDog.transform.position.z }, 5000);
        };
        SceneLayer.prototype.completeAni = function (name, objName) {
            GameConfig.mainScene.removeChildByName(objName);
            GameConfig.mainScene.removeChild(this.camera2);
            GameConfig.dogPos = new Laya.Vector3(0, -8, -8);
            GameConfig.layaDog.transform.position = GameConfig.dogPos;
            LayaAir3D.resetBG(name);
        };
        return SceneLayer;
    }());
    views.SceneLayer = SceneLayer;
})(views || (views = {}));
//# sourceMappingURL=SceneLayer.js.map