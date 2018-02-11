var FirstView = views.RedBagFirst;
var OpenView = views.OpenView;
var GameConfig = configs.GameConfig;
var HttpConfig = configs.HttpConfig;
var IdentityConfig = configs.IdentityConfig;
var HttpServiceProxy = nets.HttpServiceProxy;
var SocketManeger = nets.SocketManager;
var LayaAir3D = /** @class */ (function () {
    function LayaAir3D() {
        /**
         * 对陀螺仪旋转角度的监听
         */
        this.isRun = false;
        this.dogRotation = 0;
        this.intAlpha = 800;
        this.dogP = 0;
        this.alphaN = 0;
        this.betaN = 0;
        this.gammaN = 0;
        //初始化引擎
        Laya3D.init(600, 800, true, true);
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
        //添加3D场景-----------------------
        LayaAir3D.scene = new Laya.Scene();
        Laya.stage.addChild(LayaAir3D.scene);
        if (LayaAir3D.Gyro == true) {
            Laya.Gyroscope.instance.on(Laya.Event.CHANGE, this, this.onMotoin);
        }
        else if (LayaAir3D.Gyro == false) {
            Laya.Gyroscope.instance.off(Laya.Event.CHANGE, this, null);
        }
        this.init();
    }
    LayaAir3D.prototype.init = function () {
        LayaAir3D.scene.removeChildren();
        this.dataInit();
        this.createAdapter();
        Laya.loader.create([{ url: "res/atlas/imgs.atlas", type: Laya.Loader.ATLAS },
            { url: "res/LayaDog/minidog.lh", type: Laya.Sprite3D },
            { url: "res/fudai/fudai.lh", type: Laya.Sprite3D },
            { url: "res/gift/gift.lh", type: Laya.Sprite3D },
            { url: "res/paket/paket.lh", type: Laya.Sprite3D },
            { url: "res/firework/firework.lh", type: Laya.Sprite3D }
        ], Laya.Handler.create(this, this.openCamera));
        this.musicPlay();
        this.gameUI = new gameMain();
        this.gameUI.name = "gameUI";
        Laya.stage.addChild(this.gameUI);
    };
    LayaAir3D.prototype.dataInit = function () {
        this.monTex = new Laya.Text();
        this.monTex.text = "";
        this.monTex.fontSize = 20;
        this.monTex.color = "#000000";
        this.monTex.pos(Laya.stage.width / 2, 150);
        Laya.stage.addChild(this.monTex);
        LayaAir3D.spArr = new Array();
        this.oldArr = new Array();
        this.cVec = new Laya.Vector3(-45, 30, 0);
        if (laya.utils.Browser.onAndriod) {
            LayaAir3D.dogPos = new Laya.Vector3(-5, 10, 0);
        }
        else if (laya.utils.Browser.onIOS) {
            LayaAir3D.dogPos = new Laya.Vector3(0, -10, -10);
        }
        else {
            LayaAir3D.dogPos = new Laya.Vector3(-5, 10, 0);
        }
        LayaAir3D.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        LayaAir3D.rayCastHit = new Laya.RaycastHit();
        // if(LayaAir3D.Gyro == true){
        //     Laya.Gyroscope.instance.on(Laya.Event.CHANGE, this, this.onMotoin);
        // }else if(LayaAir3D.Gyro == false){
        //     Laya.Gyroscope.instance.off(Laya.Event.CHANGE, this, null);
        // }
    };
    /**
     * 不用系统的机型进行不同的场景适配
     */
    LayaAir3D.prototype.createAdapter = function () {
        if (laya.utils.Browser.onAndriod) {
            //创建摄像机(横纵比，近距裁剪，远距裁剪)-----
            LayaAir3D.camera = new Laya.Camera(0, 1, 500);
            //加载到场景
            LayaAir3D.scene.addChild(LayaAir3D.camera);
            //移动摄像机位置
            LayaAir3D.camera.transform.translate(new Laya.Vector3(2, 15, 2));
            // Laya.timer.frameLoop(1,this,this.changeCamera,[LayaAir3D.camera]);
            //旋转摄像机角度
            LayaAir3D.camera.transform.rotate(this.cVec, true, false);
            LayaAir3D.camera.addComponent(VRCameraMoveScript);
            // LayaAir3D.camera.fieldOfView =45;
            //创建方向光 ------------------------
            var light = LayaAir3D.scene.addChild(new Laya.DirectionLight());
            //移动灯光位置
            light.transform.translate(new Laya.Vector3(2, 15, 2));
            //调整灯光方向
            light.direction = new Laya.Vector3(0.6, -3, 0);
            //设置灯光漫反射颜色
            light.diffuseColor = new Laya.Vector3(0.3, 0.3, 0.3);
        }
        else if (laya.utils.Browser.onIOS) {
            //创建摄像机(横纵比，近距裁剪，远距裁剪)-----
            LayaAir3D.camera = new Laya.Camera(0, 0.1, 20);
            //加载到场景
            LayaAir3D.scene.addChild(LayaAir3D.camera);
            //移动摄像机位置
            LayaAir3D.camera.transform.translate(new Laya.Vector3(0, 0, 3));
            // Laya.timer.frameLoop(1,this,this.changeCamera,[LayaAir3D.camera]);
            //旋转摄像机角度
            // LayaAir3D.camera.transform.rotate(this.cVec, true, false);
            LayaAir3D.camera.addComponent(VRCameraMoveScript);
            // LayaAir3D.camera.fieldOfView =45;
            //创建方向光 ------------------------
            var light = LayaAir3D.scene.addChild(new Laya.DirectionLight());
            //移动灯光位置
            light.transform.translate(new Laya.Vector3(0, 0, 0));
            //调整灯光方向
            light.direction = new Laya.Vector3(0, -3, 0);
            //设置灯光漫反射颜色
            light.diffuseColor = new Laya.Vector3(1, 1, 1);
        }
    };
    LayaAir3D.prototype.changeCamera = function (camera) {
        if (laya.utils.Browser.onAndriod) {
            camera.transform.position = new Laya.Vector3(2, 15, 2);
        }
        else if (laya.utils.Browser.onIOS) {
            camera.transform.position = new Laya.Vector3(0, 0, 3);
        }
    };
    LayaAir3D.resetCamera = function () {
        if (laya.utils.Browser.onAndriod) {
            LayaAir3D.camera.transform.position = new Laya.Vector3(2, 15, 2);
        }
        else if (laya.utils.Browser.onIOS) {
            LayaAir3D.camera.transform.position = new Laya.Vector3(0, 0, 3);
        }
    };
    LayaAir3D.prototype.onMotoin = function (absolute, rotationInfo) {
        this.monTex.text =
            "alpha:" + Math.floor(rotationInfo.alpha) + '\n' +
                "beta :" + Math.floor(rotationInfo.beta) + '\n' +
                "gamma:" + Math.floor(rotationInfo.gamma) + '\n' +
                "angle:" + this.dogRotation;
        this.alphaN = rotationInfo.alpha;
        this.betaN = rotationInfo.beta;
        this.gammaN = rotationInfo.gamma;
        if (laya.utils.Browser.onIOS) {
            if (this.intAlpha > 1) {
                this.intAlpha = Math.floor(rotationInfo.alpha);
            }
        }
        else {
            if (this.intAlpha < 1) {
                this.intAlpha = Math.floor(rotationInfo.alpha);
            }
        }
        this.dogRotation = Math.floor(rotationInfo.alpha) - this.intAlpha;
        if (this.isRun == false && LayaAir3D.layaDog != null) {
            var dog = LayaAir3D.layaDog;
            //dog.transform.rotate(new Laya.Vector3(0,-this.dogRotation,0) );
            //this.intAlpha = Math.floor(rotationInfo.alpha);
            if ((this.dogRotation > 15 || (this.dogRotation < -300 && this.dogRotation > -345)) && this.dogP != -1) {
                LayaAir3D.ani.play("A_run");
                dog.transform.rotate(new Laya.Vector3(0, 80, 0));
                Laya.Tween.to(LayaAir3D.layaDog.transform.position, { x: -8, y: LayaAir3D.layaDog.transform.position.y, z: LayaAir3D.layaDog.transform.position.z }, 2000, Laya.Ease.linearIn, Laya.Handler.create(this, this.dogIdle));
                this.isRun = true;
                this.dogP = -1;
                var a = Math.random();
                if (a > 0.8) {
                    Laya.SoundManager.playSound("res/barking.mp3");
                }
            }
            else if ((this.dogRotation < -15 || (this.dogRotation > 300 && this.dogRotation < 345)) && this.dogP != 1) {
                LayaAir3D.ani.play("A_run");
                dog.transform.rotate(new Laya.Vector3(0, -80, 0));
                Laya.Tween.to(LayaAir3D.layaDog.transform.position, { x: 8, y: LayaAir3D.layaDog.transform.position.y, z: LayaAir3D.layaDog.transform.position.z }, 2000, Laya.Ease.linearIn, Laya.Handler.create(this, this.dogIdle));
                this.isRun = true;
                this.dogP = 1;
                var a = Math.random();
                if (a > 0.8) {
                    Laya.SoundManager.playSound("res/barking.mp3");
                }
            }
        }
    };
    LayaAir3D.prototype.musicPlay = function () {
        Laya.SoundManager.playSound("res/barking.wav");
    };
    LayaAir3D.prototype.dogIdle = function () {
        LayaAir3D.ani.play("B_idle");
        this.isRun = false;
        LayaAir3D.layaDog.transform.rotation = new Laya.Quaternion(0, 0, 0, -1);
    };
    /** 开摄像机 */
    LayaAir3D.prototype.openCamera = function () {
        LayaAir3D.video = document.createElement('video');
        LayaAir3D.video.setAttribute('autoplay', '');
        LayaAir3D.video.setAttribute('muted', '');
        LayaAir3D.video.setAttribute('playsinline', '');
        LayaAir3D.video.style.width = laya.utils.Browser.width;
        LayaAir3D.video.style.height = laya.utils.Browser.height;
        if (Laya.Browser.onAndriod) {
            LayaAir3D.video.addEventListener('click', this.onShoot, true);
            Laya.stage.on(Laya.Event.CLICK, this, this.onShoot);
        }
        else if (Laya.Browser.onIOS) {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onShoot);
        }
        else {
            LayaAir3D.video.addEventListener('click', this.onShoot, true);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onShoot);
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
        this.connetService();
    };
    //连接服务器
    LayaAir3D.prototype.connetService = function () {
        var pfObj;
        pfObj = { "protocol": "https", "host": "www.secsplus.com", "port": 8080, "path": "/redpacket/pacontro/", "platform": "mmc" };
        HttpConfig.init(pfObj["protocol"] + "://", pfObj["host"], pfObj["port"], pfObj["path"]);
        SocketManeger.getInstance().init();
        window.addEventListener("beforeunload", function () {
            if (SocketManeger.getInstance().socket) {
                SocketManeger.getInstance().socket.close();
            }
        });
        this.onCreateComplete();
    };
    LayaAir3D.prototype.onCreateComplete = function () {
        //添加狗的动画模型
        var vec3 = new Laya.Vector3(0, 0, 0);
        LayaAir3D.layaDog = Laya.loader.getRes("res/LayaDog/minidog.lh");
        LayaAir3D.layaDog.transform.localScale = new Laya.Vector3(10, 10, 10);
        LayaAir3D.scene.addChild(LayaAir3D.layaDog);
        if (laya.utils.Browser.onAndriod) {
            LayaAir3D.layaDog.transform.rotate(vec3, false, false);
            LayaAir3D.layaDog.transform.position = LayaAir3D.dogPos;
        }
        else if (laya.utils.Browser.onIOS) {
            LayaAir3D.layaDog.transform.position = new Laya.Vector3(0, 0, 0);
        }
        Laya.timer.frameLoop(1, this, this.resetDogPosition);
        LayaAir3D.ani = LayaAir3D.layaDog.getChildAt(0)["_components"][0];
        // 创建漂浮物
        for (var i = 0; i < 15; i++) {
            this.createObj(i);
        }
        this.animate();
        Laya.timer.loop(7000, this, this.animate);
    };
    LayaAir3D.prototype.createObj = function (i) {
        var giftNum = Math.floor(Math.random() * 3);
        var math = Math.random() > 0.5 ? 1 : -1;
        if (laya.utils.Browser.onAndriod) {
            this.math1 = (Math.random() * 3 + 2) * -1; //前后  // *5+ 10
            this.math2 = (Math.random() * 10 + 10); //上下
            this.math3 = (Math.random() * 20) * math; //左右  //25
        }
        else if (laya.utils.Browser.onIOS) {
            this.math1 = (Math.random() * 3) * math; //前后  
            this.math2 = (Math.random() * 10) - 3; //上下
            this.math3 = -5; //左右 
        }
        this.oldVec = new Laya.Vector3(this.math1, this.math2, this.math3);
        this.oldArr.push(this.oldVec);
        var gift01 = Laya.Sprite3D.load("res/fudai/fudai.lh");
        var gift02 = Laya.Sprite3D.load("res/gift/gift.lh");
        var gift03 = Laya.Sprite3D.load("res/paket/paket.lh");
        switch (giftNum) {
            case 0:
                this.layaGift_clone1 = LayaAir3D.scene.addChild(Laya.Sprite3D.instantiate(gift01, null, false, new Laya.Vector3(this.oldVec.x, this.oldVec.y, this.oldVec.z)));
                this.layaGift_clone1.transform.position = this.oldVec;
                this.layaGift_clone1.name = "福袋";
                this.jihe(this.layaGift_clone1);
                break;
            case 1:
                this.layaGift_clone2 = LayaAir3D.scene.addChild(Laya.Sprite3D.instantiate(gift02, null, false, new Laya.Vector3(this.oldVec.x, this.oldVec.y, this.oldVec.z)));
                this.layaGift_clone2.transform.position = this.oldVec;
                this.layaGift_clone2.name = "盒子";
                this.jihe(this.layaGift_clone2);
                break;
            case 2:
                this.layaGift_clone3 = LayaAir3D.scene.addChild(Laya.Sprite3D.instantiate(gift03, null, false, new Laya.Vector3(this.oldVec.x, this.oldVec.y, this.oldVec.z)));
                this.layaGift_clone3.transform.position = this.oldVec;
                this.layaGift_clone3.name = "红包";
                this.jihe(this.layaGift_clone3);
                break;
        }
    };
    LayaAir3D.prototype.jihe = function (gift) {
        gift.transform.localScale = new Laya.Vector3(4, 4, 4);
        //gift.transform.rotate(new Laya.Vector3(0, 90, 0));
        LayaAir3D.spArr.push(gift);
        Laya.timer.frameLoop(1, this, this.resetPosition);
    };
    LayaAir3D.prototype.resetPosition = function () {
        for (var i = 0; i < LayaAir3D.spArr.length; i++) {
            var aniGift = LayaAir3D.spArr[i];
            aniGift.transform.position = this.oldArr[i];
        }
    };
    LayaAir3D.prototype.resetDogPosition = function () {
        LayaAir3D.layaDog.transform.position = LayaAir3D.dogPos;
    };
    LayaAir3D.prototype.animate = function () {
        for (var i = 0; i < LayaAir3D.spArr.length; i++) {
            var aniGift = LayaAir3D.spArr[i];
            var math = Math.random() > 0.5 ? 1 : -1;
            if (laya.utils.Browser.onAndriod) {
                var math1 = (Math.random() * 3 + 2) * -1; // *5+ 10
                var math2 = (Math.random() * 10 + 10);
                var math3 = (Math.random() * 20) * math; //25
                this.newVec = new Laya.Vector3(math1, math2, math3);
            }
            else if (laya.utils.Browser.onIOS) {
                var math1 = (Math.random() * 3 + 5) * math; // *5+ 10
                var math2 = (Math.random() * 10) - 3;
                var math3 = -5; //25
                this.newVec = new Laya.Vector3(math1, math2, math3);
            }
            Laya.Tween.to(aniGift.transform.position, { x: math1, y: math2, z: math3 }, 7000);
        }
    };
    /**
    * 子弹发射
    * 基本原理：鼠标点击产生射线，射线如与模型碰撞器相交，则获取碰撞点作为子弹发射方向；
    * 如果未与3D模型相交，则直接使用射线方向作为发射方向。
    */
    LayaAir3D.prototype.onShoot = function () {
        if (LayaAir3D.isShoot || LayaAir3D.giftOpen) {
            return;
        }
        else {
            LayaAir3D.isShoot = true;
        }
        //创建子弹模型
        Laya.SoundManager.playSound("res/shoot.wav");
        var firework = Laya.Sprite3D.load("res/firework/firework.lh");
        //克隆sprite3d
        var cloneBullet = Laya.Sprite3D.instantiate(firework, LayaAir3D.scene, false, new Laya.Vector3(0, -1, 3)); //0, -1, 3
        LayaAir3D.scene.addChild(cloneBullet);
        cloneBullet.transform.scale = new Laya.Vector3(3, 3, 3); //3,3,3
        cloneBullet.transform.rotate(new Laya.Vector3(this.betaN - 145, this.dogRotation, 0), true, false);
        console.log(this.dogRotation);
        //为子弹加控制脚本
        var script = cloneBullet.addComponent(BulletScript);
        //鼠标点击屏幕的位置
        LayaAir3D.mousePos = new Laya.Vector2(Laya.stage.width / 2, Laya.stage.height / 2.2); //Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY
        //鼠标点击屏幕产生射线
        LayaAir3D.camera.viewportPointToRay(LayaAir3D.mousePos, LayaAir3D.ray);
        //射线与3D模型中的碰撞器进行碰撞检测
        Laya.Physics.rayCast(LayaAir3D.ray, LayaAir3D.rayCastHit, 30, 0);
        // for (var i: number = 0; i < LayaAir3D.spArr.length; i++) {
        //     var obj: Laya.Sprite3D = LayaAir3D.spArr[i] as Laya.Sprite3D;
        //     console.log(obj.transform.position.z);
        //     console.log(bullet.transform.position.z);
        // }
        //-----------在子弹脚本中设置子弹发射方向----------------------
        //射击的方向向量
        var dirV3 = new Laya.Vector3();
        //如果鼠标点击到模型上（射线与碰撞器发生碰撞）
        if (LayaAir3D.rayCastHit.distance !== -1) {
            //子弹射击方向向量 = 由鼠标点中的目标位置向量 —— 子弹起始位置向量
            Laya.Vector3.subtract(LayaAir3D.rayCastHit.position, cloneBullet.transform.position, dirV3);
            //设置子弹控制脚本中发射方向
            script.setShootDirection(dirV3);
        }
        else {
            /**
             *射线方向向量是归一化的单位向量，不能直接用于向量加减。需要根据射线产生的原理算
             *出相当于有长短距离的方向向量用于计算，可以通过向量缩放方法实现。
             *射线原理：原点是鼠标点击在近裁剪面上的点,方向是从摄像机位置到鼠标点击在远裁剪面
             *上的点产生的归一化方向。因此可以用摄像机到远裁面的距离模拟原始方向向量
             **/
            // console.log(Laya.Vector3.scalarLength(this.ray.direction));
            //摄像机到鼠标点击处的方向向量
            var aV3 = new Laya.Vector3();
            //根据射线方向向量、摄像机远裁剪值缩放为射线方向原始向量(使用远裁距会有一点误差，但不影响效果)
            Laya.Vector3.scale(LayaAir3D.ray.direction, LayaAir3D.camera.farPlane, aV3);
            //根据摄像机与子弹的位置求出子弹到摄像机的方向向量
            var bV3 = new Laya.Vector3();
            Laya.Vector3.subtract(LayaAir3D.camera.transform.position, cloneBullet.transform.position, bV3);
            //射击的方向向量 = 摄像机到鼠标点击处的方向向量 +子弹到摄像机的方向向量
            Laya.Vector3.add(aV3, bV3, dirV3);
            //设置子弹控制脚本中发射方向
            // var a:Laya.Vector3 = new Laya.Vector3;
            // var b:Laya.Vector3 = new Laya.Vector3;
            // Laya.Vector3.normalize(dirV3,a);
            // Laya.Vector3.subtract(a,cloneBullet.transform.forward,b);
            // console.log(b.elements);
            script.setShootDirection(dirV3);
        }
    };
    /**
     * 更改动画
     */
    LayaAir3D.changeAni = function (obj) {
        LayaAir3D.ani.play("A_jump");
        Laya.timer.once(3000, this, function () {
            if (laya.utils.Browser.onAndriod) {
                LayaAir3D.camera.transform.position = new Laya.Vector3(2, 15, 2);
            }
            else if (laya.utils.Browser.onIOS) {
                LayaAir3D.camera.transform.position = new Laya.Vector3(0, 0, 3);
            }
            LayaAir3D.camera.addComponent(VRCameraMoveScript);
            LayaAir3D.camera.fieldOfView = 45;
        });
        // LayaAir3D.giftUI(obj);
    };
    /**
     * 显示点击红包界面
     */
    LayaAir3D.giftUI = function (name) {
        LayaAir3D.giftOpen = true;
        LayaAir3D.firstView = new FirstView();
        LayaAir3D.firstView.zOrder = 9999;
        if (Laya.Browser.onAndriod) {
            LayaAir3D.video.addEventListener('click', LayaAir3D.resetBG(name), true);
        }
        else if (Laya.Browser.onIOS) {
            Laya.stage.on(Laya.Event.CLICK, this, LayaAir3D.resetBG, [name]);
        }
        else {
            Laya.stage.on(Laya.Event.CLICK, this, LayaAir3D.resetBG, [name]);
            console.log(123);
        }
    };
    LayaAir3D.resetBG = function (name) {
        Laya.stage.off(Laya.Event.CLICK, this, LayaAir3D.resetBG);
        Laya.stage.removeChild(LayaAir3D.firstView);
        LayaAir3D.firstView.removeSelf();
        /** 发现在3D模式中利用2D中的设置大小属性无效 */
        LayaAir3D.openView = new OpenView(name);
    };
    /** 狗的模型 */
    LayaAir3D.layaDog = null;
    LayaAir3D.Gyro = true;
    LayaAir3D.isShoot = false;
    LayaAir3D.giftOpen = false;
    return LayaAir3D;
}());
new LayaAir3D;
//# sourceMappingURL=LayaAir3D.js.map