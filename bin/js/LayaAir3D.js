var OpenView = views.OpenView;
var GameMain = views.GameMain;
var GameConfig = configs.GameConfig;
var HttpConfig = configs.HttpConfig;
var IdentityConfig = configs.IdentityConfig;
var HttpServiceProxy = nets.HttpServiceProxy;
var SocketManeger = nets.SocketManager;
var Handler = laya.utils.Handler;
var LayaAir3D = /** @class */ (function () {
    function LayaAir3D() {
        /** 监听陀螺仪变化相关数据 */
        this.isRun = false;
        this.intAlpha = 800;
        this.dogP = 0;
        this.alphaN = 0;
        this.gammaN = 0;
        //初始化引擎
        Laya3D.init(GameConfig.GAME_WINDOW_WIDTH, GameConfig.GAME_WINDOW_HEIGHT, true, true);
        if (Laya.Render.isWebGL == true) {
            Laya.stage.bgColor = "none";
            Config.isAlpha = true;
        }
        else {
            Laya.stage.bgColor = null;
        }
        //适配模式
        Laya.stage.mouseEnabled = true;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //开启统计信息
        // Laya.Stat.show();
        LayaAir3D.instance = this;
        Laya.loader.create([{ url: "res/atlas/imgs.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
            { url: "res/LayaDog/minidog.lh", type: Laya.Sprite3D },
            { url: "res/fudai/fudai.lh", type: Laya.Sprite3D },
            { url: "res/gift/gift.lh", type: Laya.Sprite3D },
            { url: "res/paket/paket.lh", type: Laya.Sprite3D },
            { url: "res/firework/firework.lh", type: Laya.Sprite3D }
        ], Laya.Handler.create(this, this.dataInit));
    }
    /** 数据初始化 */
    LayaAir3D.prototype.dataInit = function () {
        this.musicPlay();
        this.openCamera();
        GameConfig.spArr = new Array();
        this.oldArr = new Array();
        this.cVec = new Laya.Vector3(0, -90, 0);
        GameConfig.dogPos = new Laya.Vector3(0, -10, -10);
        GameConfig.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        GameConfig.rayCastHit = new Laya.RaycastHit();
        Laya.Gyroscope.instance.on(Laya.Event.CHANGE, this, this.onMotoin);
        /** 连接服务器并初始化服务器相关配置信息 */
        this.connetService();
    };
    /** Http配置信息初始化 */
    LayaAir3D.prototype.connetService = function () {
        var pfObj;
        pfObj = { "protocol": "https", "host": "www.secsplus.com", "port": 8080, "path": "/redpacket/pacontro/", "platform": "mmc" };
        HttpConfig.init(pfObj["protocol"] + "://", pfObj["host"], pfObj["port"], pfObj["path"]);
        this.createAdapter();
    };
    /** 调用摄像机 */
    LayaAir3D.prototype.openCamera = function () {
        LayaAir3D.video = document.createElement('video');
        LayaAir3D.video.setAttribute('autoplay', '');
        LayaAir3D.video.setAttribute('muted', '');
        LayaAir3D.video.setAttribute('playsinline', '');
        LayaAir3D.video.style.width = laya.utils.Browser.width;
        LayaAir3D.video.style.height = laya.utils.Browser.height;
        if (Laya.Browser.onAndriod) {
            LayaAir3D.video.addEventListener('click', function () {
                LayaAir3D.onShoot();
            }, true);
            // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.onShoot);  //本地测试用
        }
        else if (Laya.Browser.onIOS) {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.onShoot);
        }
        else {
            LayaAir3D.video.addEventListener('click', function () {
                LayaAir3D.onShoot();
            }, true);
        }
        var onError = function (error) {
            console.log('Webcam Error\nName: ' + error.name + '\nMessage: ' + error.message);
        };
        if (navigator.mediaDevices === undefined || navigator.mediaDevices.enumerateDevices === undefined || navigator.mediaDevices.getUserMedia === undefined) {
            if (navigator.mediaDevices === undefined) {
                var fctName = 'navigator.mediaDevices';
            }
            else if (navigator.mediaDevices.enumerateDevices === undefined) {
                var fctName = 'navigator.mediaDevices.enumerateDevices';
            }
            else if (navigator.mediaDevices.getUserMedia === undefined) {
                var fctName = 'navigator.mediaDevices.getUserMedia';
            }
            else {
                console.assert(false);
            }
            onError({
                name: '',
                message: 'WebRTC issue-! ' + fctName + ' not present in your browser'
            });
            return null;
        }
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
            var userMediaConstraints = {
                audio: false,
                video: {
                    facingMode: 'environment',
                }
            };
            navigator.mediaDevices.getUserMedia(userMediaConstraints).then(function success(stream) {
                var status = true;
                LayaAir3D.video.srcObject = stream;
                LayaAir3D.video.play();
                /** 等到视频流准备就绪 */
                var interval = setInterval(function () {
                    if (!LayaAir3D.video.videoWidth) {
                        return;
                    }
                    laya.utils.Browser.document.body.appendChild(LayaAir3D.video);
                    clearInterval(interval);
                }, 1000 / 50);
            });
        }).catch(function (error) {
            onError({
                message: error.message
            });
        });
    };
    /** 创建场景 */
    LayaAir3D.prototype.createAdapter = function () {
        //添加3D场景
        GameConfig.mainScene = new Laya.Scene();
        Laya.stage.addChild(GameConfig.mainScene);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)-----
        GameConfig.mainCamera = new Laya.Camera(0, 0.1, 20);
        //加载到场景
        GameConfig.mainScene.addChild(GameConfig.mainCamera);
        //移动摄像机位置
        GameConfig.mainCamera.transform.translate(new Laya.Vector3(0, 0, 3));
        GameConfig.mainCamera.addComponent(VRCameraMoveScript);
        //创建方向光 
        var light = GameConfig.mainCamera.addChild(new Laya.DirectionLight());
        //移动灯光位置
        light.transform.translate(new Laya.Vector3(0, 7, -5)); //0, 0, 0
        //调整灯光方向
        light.direction = new Laya.Vector3(0, 0, -5); // 0, -3, 0
        //设置灯光漫反射颜色
        light.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
        this.onCreateComplete();
        //添加瞄准镜界面
        this.gameUI = new GameMain();
        this.gameUI.name = "gameUI";
        Laya.stage.addChild(this.gameUI);
    };
    /** 添加模型 */
    LayaAir3D.prototype.onCreateComplete = function () {
        //添加狗的动画模型
        var vec3 = new Laya.Vector3(0, 0, 0);
        GameConfig.layaDog = Laya.Sprite3D.load("res/LayaDog/minidog.lh");
        GameConfig.layaDog.transform.localScale = new Laya.Vector3(10, 10, 10);
        GameConfig.mainScene.addChild(GameConfig.layaDog);
        GameConfig.layaDog.transform.position = new Laya.Vector3(0, -8, -8);
        Laya.timer.frameLoop(1, this, this.resetDogPosition);
        GameConfig.ani = GameConfig.layaDog.getChildAt(0)["_components"][0];
        // 创建漂浮物
        for (var i = 0; i < 15; i++) {
            this.createObj(i);
        }
        this.animate();
        Laya.timer.loop(7000, this, this.animate);
    };
    /** 播放音效 */
    LayaAir3D.prototype.musicPlay = function () {
        Laya.SoundManager.playSound("res/music/barking.wav");
    };
    /** 对陀螺仪旋转角度的监听 */
    LayaAir3D.prototype.onMotoin = function (absolute, rotationInfo) {
        if (rotationInfo.alpha == null) {
            alert("当前设备不支持陀螺仪");
            Laya.Gyroscope.instance.off(Laya.Event.CHANGE, this, this.onMotoin);
            return;
        }
        else {
            this.alphaN = rotationInfo.alpha;
            LayaAir3D.betaN = rotationInfo.beta;
            this.gammaN = rotationInfo.gamma;
            if (this.intAlpha > 1) {
                this.intAlpha = Math.floor(rotationInfo.alpha);
            }
            LayaAir3D.dogRotation = Math.floor(rotationInfo.alpha) - this.intAlpha;
            if (this.isRun == false && GameConfig.layaDog != null) {
                var dog = GameConfig.layaDog;
                if ((LayaAir3D.dogRotation > 15 || (LayaAir3D.dogRotation < -300 && LayaAir3D.dogRotation > -345)) && this.dogP != -1) {
                    GameConfig.ani.play("A_run");
                    dog.transform.rotate(new Laya.Vector3(0, 80, 0));
                    Laya.Tween.to(GameConfig.layaDog.transform.position, { x: -8, y: GameConfig.layaDog.transform.position.y, z: GameConfig.layaDog.transform.position.z }, 2000, Laya.Ease.linearIn, Laya.Handler.create(this, this.dogIdle));
                    this.isRun = true;
                    this.dogP = -1;
                    var a = Math.random();
                    if (a > 0.8) {
                        Laya.SoundManager.playSound("res/music/barking.wav");
                    }
                }
                else if ((LayaAir3D.dogRotation < -15 || (LayaAir3D.dogRotation > 300 && LayaAir3D.dogRotation < 345)) && this.dogP != 1) {
                    GameConfig.ani.play("A_run");
                    dog.transform.rotate(new Laya.Vector3(0, -80, 0));
                    Laya.Tween.to(GameConfig.layaDog.transform.position, { x: 8, y: GameConfig.layaDog.transform.position.y, z: GameConfig.layaDog.transform.position.z }, 2000, Laya.Ease.linearIn, Laya.Handler.create(this, this.dogIdle));
                    this.isRun = true;
                    this.dogP = 1;
                    var a = Math.random();
                    if (a > 0.8) {
                        Laya.SoundManager.playSound("res/music/barking.wav");
                    }
                }
            }
        }
    };
    LayaAir3D.prototype.dogIdle = function () {
        GameConfig.ani.play("B_idle");
        this.isRun = false;
        GameConfig.layaDog.transform.rotation = new Laya.Quaternion(0, 0, 0, -1);
    };
    /** 创建漂浮物模型 */
    LayaAir3D.prototype.createObj = function (i) {
        var giftNum = Math.floor(Math.random() * 3);
        var math = Math.random() > 0.5 ? 1 : -1;
        this.math1 = (Math.random() * 3) * math;
        this.math2 = (Math.random() * 10) - 3;
        this.math3 = -5;
        this.oldVec = new Laya.Vector3(this.math1, this.math2, this.math3);
        this.oldArr.push(this.oldVec);
        var gift01 = Laya.Sprite3D.load("res/fudai/fudai.lh");
        var gift02 = Laya.Sprite3D.load("res/gift/gift.lh");
        var gift03 = Laya.Sprite3D.load("res/paket/paket.lh");
        switch (giftNum) {
            case 0:
                this.layaGift_clone1 = GameConfig.mainScene.addChild(Laya.Sprite3D.instantiate(gift01, null, false, new Laya.Vector3(this.oldVec.x, this.oldVec.y, this.oldVec.z)));
                this.layaGift_clone1.transform.position = this.oldVec;
                this.layaGift_clone1.name = "福袋";
                this.jihe(this.layaGift_clone1);
                break;
            case 1:
                this.layaGift_clone2 = GameConfig.mainScene.addChild(Laya.Sprite3D.instantiate(gift02, null, false, new Laya.Vector3(this.oldVec.x, this.oldVec.y, this.oldVec.z)));
                this.layaGift_clone2.transform.position = this.oldVec;
                this.layaGift_clone2.name = "盒子";
                this.jihe(this.layaGift_clone2);
                break;
            case 2:
                this.layaGift_clone3 = GameConfig.mainScene.addChild(Laya.Sprite3D.instantiate(gift03, null, false, new Laya.Vector3(this.oldVec.x, this.oldVec.y, this.oldVec.z)));
                this.layaGift_clone3.transform.position = this.oldVec;
                this.layaGift_clone3.name = "红包";
                this.jihe(this.layaGift_clone3);
                break;
        }
    };
    LayaAir3D.prototype.jihe = function (gift) {
        gift.transform.localScale = new Laya.Vector3(4, 4, 4);
        GameConfig.spArr.push(gift);
        Laya.timer.frameLoop(1, this, this.resetPosition);
    };
    LayaAir3D.prototype.resetPosition = function () {
        for (var i = 0; i < GameConfig.spArr.length; i++) {
            var aniGift = GameConfig.spArr[i];
            aniGift.transform.position = this.oldArr[i];
        }
    };
    LayaAir3D.prototype.resetDogPosition = function () {
        GameConfig.layaDog.transform.position = GameConfig.dogPos;
    };
    LayaAir3D.prototype.animate = function () {
        for (var i = 0; i < GameConfig.spArr.length; i++) {
            var aniGift = GameConfig.spArr[i];
            var math = Math.random() > 0.5 ? 1 : -1;
            var math1 = (Math.random() * 3 + 5) * math;
            var math2 = (Math.random() * 10) - 3;
            var math3 = -5;
            this.newVec = new Laya.Vector3(math1, math2, math3);
            Laya.Tween.to(aniGift.transform.position, { x: math1, y: math2, z: math3 }, 7000);
        }
    };
    /** 射击碰撞检测 */
    LayaAir3D.onShoot = function () {
        GameConfig.shootNums++;
        if (GameConfig.isShoot || GameConfig.giftOpen) {
            return;
        }
        else {
            GameConfig.isShoot = true;
        }
        //创建子弹模型
        Laya.SoundManager.playSound("res/music/shoot.wav");
        var firework = Laya.Sprite3D.load("res/firework/firework.lh");
        //克隆sprite3d
        var cloneBullet = GameConfig.mainScene.addChild(Laya.Sprite3D.instantiate(firework, null, false, new Laya.Vector3(0, -1, 3)));
        cloneBullet.transform.scale = new Laya.Vector3(3, 3, 3);
        cloneBullet.transform.rotate(new Laya.Vector3(LayaAir3D.betaN - 145, LayaAir3D.dogRotation, 0), true, false);
        //为子弹加控制脚本
        var script = cloneBullet.addComponent(BulletScript);
        //鼠标点击屏幕的位置
        GameConfig.mousePos = new Laya.Vector2(Laya.stage.width / 2, Laya.stage.height / 2.2);
        //鼠标点击屏幕产生射线
        GameConfig.mainCamera.viewportPointToRay(GameConfig.mousePos, GameConfig.ray);
        //射线与3D模型中的碰撞器进行碰撞检测
        Laya.Physics.rayCast(GameConfig.ray, GameConfig.rayCastHit, 30, 0);
        //-----------在子弹脚本中设置子弹发射方向----------------------
        //射击的方向向量
        var dirV3 = new Laya.Vector3();
        //如果鼠标点击到模型上（射线与碰撞器发生碰撞）
        if (GameConfig.rayCastHit.distance !== -1) {
            //子弹射击方向向量 = 由鼠标点中的目标位置向量 —— 子弹起始位置向量
            Laya.Vector3.subtract(GameConfig.rayCastHit.position, cloneBullet.transform.position, dirV3);
            //设置子弹控制脚本中发射方向
            script.setShootDirection(dirV3);
        }
        else {
            //摄像机到鼠标点击处的方向向量
            var aV3 = new Laya.Vector3();
            //根据射线方向向量、摄像机远裁剪值缩放为射线方向原始向量(使用远裁距会有一点误差，但不影响效果)
            Laya.Vector3.scale(GameConfig.ray.direction, GameConfig.mainCamera.farPlane, aV3);
            //根据摄像机与子弹的位置求出子弹到摄像机的方向向量
            var bV3 = new Laya.Vector3();
            Laya.Vector3.subtract(GameConfig.mainCamera.transform.position, cloneBullet.transform.position, bV3);
            //射击的方向向量 = 摄像机到鼠标点击处的方向向量 +子弹到摄像机的方向向量
            Laya.Vector3.add(aV3, bV3, dirV3);
            //设置子弹控制脚本中发射方向
            script.setShootDirection(dirV3);
        }
    };
    /** 打开红包界面 */
    LayaAir3D.resetBG = function (name) {
        GameConfig.giftOpen = true;
        Laya.stage.offAll(Laya.Event.MOUSE_DOWN);
        laya.utils.Browser.document.body.removeChild(LayaAir3D.video); //线上使用
        var openView = new views.OpenView(name); //用户信息界面
    };
    LayaAir3D.dogRotation = 0;
    LayaAir3D.betaN = 0;
    return LayaAir3D;
}());
new LayaAir3D;
//# sourceMappingURL=LayaAir3D.js.map