var views;
(function (views) {
    var SceneLayer = /** @class */ (function () {
        function SceneLayer(name) {
            //初始化引擎
            this.vec3 = new Laya.Vector3(8, 5, -12);
            Laya.stage.removeChildByName("gameUI");
            LayaAir3D.scene.removeChildren();
            //添加照相机
            this.camera = (LayaAir3D.scene.addChild(new Laya.Camera(0, 1, 100)));
            this.camera.transform.translate(new Laya.Vector3(-20, 8, -5));
            this.camera.transform.rotate(new Laya.Vector3(-20, -75, 0), true, false);
            this.camera.clearColor = null;
            //添加方向光
            var directionLight = LayaAir3D.scene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.direction = new Laya.Vector3(1, -1, 0);
            Laya.loader.create([{ url: "res/atlas/imgs.atlas", type: Laya.Loader.ATLAS },
                { url: "res/LayaDog/minidog.lh", type: Laya.Sprite3D },
                { url: "res/fudai/fudai.lh", type: Laya.Sprite3D },
                { url: "res/gift/gift.lh", type: Laya.Sprite3D },
                { url: "res/paket/paket.lh", type: Laya.Sprite3D },
                { url: "res/firework/firework.lh", type: Laya.Sprite3D }
            ], Laya.Handler.create(this, this.onCreateComplete, [name]));
        }
        SceneLayer.prototype.onCreateComplete = function (name) {
            //实例化加载并创建好的3D对象
            this.sprite3D = Laya.loader.getRes("res/LayaDog/minidog.lh");
            this.sprite3D.transform.rotate(new Laya.Vector3(0, 360, 0));
            this.sprite3D.transform.position = new Laya.Vector3(-8, -25, 1);
            this.sprite3D.transform.localScale = new Laya.Vector3(25, 25, 25);
            LayaAir3D.scene.addChild(this.sprite3D);
            // this.camera.transform.lookAt(this.sprite3D.transform.position,new Laya.Vector3(0,1,1));
            var ani = this.sprite3D.getChildAt(0)["_components"][0];
            ani.play("A_run");
            if (name == "福袋") {
                var gift01 = Laya.Sprite3D.load("res/fudai/fudai.lh");
                this.test(gift01);
                Laya.timer.once(1600, this, this.changeAni, [this.sprite3D, name]);
            }
            else if (name == "盒子") {
                var gift02 = Laya.Sprite3D.load("res/gift/gift.lh");
                this.test(gift02);
                Laya.timer.once(1600, this, this.changeAni, [this.sprite3D, name]);
            }
            else if (name == "红包") {
                var gift03 = Laya.Sprite3D.load("res/paket/paket.lh");
                this.test(gift03);
                Laya.timer.once(1600, this, this.changeAni, [this.sprite3D, name]);
            }
            // Laya.Tween.to(this.sprite3D.transform.position,{x:2,y:-6,z:-6},5000);
        };
        SceneLayer.prototype.test = function (obj) {
            LayaAir3D.scene.addChild(obj);
            obj.transform.position = this.vec3;
            obj.transform.localScale = new Laya.Vector3(20, 20, 20);
            Laya.timer.frameLoop(1, this, this.translatePos, [obj]);
            Laya.timer.once(100, this, this.animate, [obj]);
        };
        SceneLayer.prototype.translatePos = function (obj) {
            obj.transform.position = this.vec3;
            // this.sprite3D.transform.position=new Laya.Vector3(2,-3,-5);
        };
        SceneLayer.prototype.changeAni = function (sp, name) {
            var ani = sp.getChildAt(0)["_components"][0];
            ani.play("A_jump");
            Laya.timer.once(1000, this, this.completeAni, [name]);
        };
        SceneLayer.prototype.animate = function (obj) {
            Laya.Tween.to(obj.transform.position, { x: this.sprite3D.transform.position.x, y: this.sprite3D.transform.position.y, z: this.sprite3D.transform.position.z }, 5000);
        };
        SceneLayer.prototype.completeAni = function (name) {
            LayaAir3D.giftUI(name);
        };
        return SceneLayer;
    }());
    views.SceneLayer = SceneLayer;
})(views || (views = {}));
//# sourceMappingURL=SceneLayer.js.map