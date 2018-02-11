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
var BulletScript = /** @class */ (function (_super) {
    __extends(BulletScript, _super);
    /*
    子弹控制脚本
    */
    function BulletScript() {
        var _this = _super.call(this) || this;
        /**子弹发射的速度（方向）**/
        _this.speedV3 = new Laya.Vector3();
        return _this;
    }
    /**
    * 脚本实例化完成载入后调度
    * @param owner 脚本绑定的3D物体
    */
    BulletScript.prototype._load = function (owner) {
        //获取子弹与子弹位置
        this.bullet = this.owner;
    };
    /**
     * 设置子弹射击方向并计算速度
     * @param directionV3
     */
    BulletScript.prototype.setShootDirection = function (directionV3) {
        //将方向向量归一成单位为一的方向速度向量(在LayaAir中相当于1米的长度)
        this.speedV3 = new Laya.Vector3(0, 0, 0);
        var vec = new Laya.Vector3();
        Laya.Vector3.normalize(directionV3, vec);
        Laya.Vector3.scale(vec, 0.15, this.speedV3);
    };
    /**
     * 脚本帧循环更新
     */
    BulletScript.prototype._update = function (state) {
        //子弹位置更新
        this.bullet.transform.translate(this.speedV3, false);
        //生命周期递减
        if (this.bullet.transform.position.z < -4.5 || this.bullet.transform.position.z > 4.5 || this.bullet.transform.position.x > 10 || this.bullet.transform.position.x < -10 || this.bullet.transform.position.y > 10 || this.bullet.transform.position.y < -10) {
            this.bullet.removeSelf();
            GameConfig.isShoot = false;
            // 检测碰撞
            for (var i = 0; i < GameConfig.spArr.length; i++) {
                var obj = GameConfig.spArr[i];
                var chaX = Math.abs(obj.transform.position.x - this.bullet.transform.position.x);
                var chaY = Math.abs(obj.transform.position.y - this.bullet.transform.position.y);
                var chaZ = Math.abs(obj.transform.position.z - this.bullet.transform.position.z);
                var temporNums = Math.floor(obj.transform.position.y - 10);
                var newPos = new Laya.Vector3(obj.transform.position.x, temporNums, obj.transform.position.z);
                if (chaX < 0.5 && chaY < 0.5 && chaZ < 0.6) {
                    Laya.SoundManager.playSound("res/music/boom.wav");
                    var name_1 = obj.name;
                    if (Laya.stage.getChildIndex(GameConfig.mainScene) < 0) {
                        return;
                    }
                    else {
                        GameConfig.mainCamera.removeAllComponent();
                        Laya.Gyroscope.instance.offAll(Laya.Event.CHANGE);
                        GameConfig.isShoot = true;
                        var scene = new views.SceneLayer(name_1);
                    }
                    break;
                }
                else {
                    if (GameConfig.shootNums >= 10) {
                        Laya.SoundManager.playSound("res/music/boom.wav");
                        var name_2 = "盒子";
                        if (Laya.stage.getChildIndex(GameConfig.mainScene) < 0) {
                            return;
                        }
                        else {
                            GameConfig.mainCamera.removeAllComponent();
                            Laya.Gyroscope.instance.offAll(Laya.Event.CHANGE);
                            GameConfig.isShoot = true;
                            var scene = new views.SceneLayer(name_2);
                        }
                        return;
                    }
                }
            }
        }
    };
    return BulletScript;
}(Laya.Script));
//# sourceMappingURL=BulletScript.js.map