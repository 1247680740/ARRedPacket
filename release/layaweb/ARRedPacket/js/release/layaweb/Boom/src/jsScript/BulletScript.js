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
var SceneLayer = views.SceneLayer;
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
        /****
         * 注：
         * 三维向量即是位置、方向，也可以是速度，但速度需要一个统一的参考衡量标准，比如“N*标准速度值/帧”或
         * “N*标准速度值/毫秒”，它类似于“N*米/帧”。
         * 而我们得到的方向向量，它的大小不一，无法作为标准速度值使用，这个时候可用Vector3.normalize()方法
         * 把任一向量归一化，产生单位为一的向量作为标准速度值，再把它进行缩放作为不同物体的速度来使用，比如
         * 0.2倍标准速度值，1.5倍标准速度值等，可使用Vector3.scale()方法缩放。
         ****/
        //将方向向量归一成单位为一的方向速度向量(在LayaAir中相当于1米的长度)
        this.speedV3 = new Laya.Vector3(0, 0, 0);
        var vec = new Laya.Vector3();
        Laya.Vector3.normalize(directionV3, vec);
        Laya.Vector3.scale(vec, 0.15, this.speedV3);
        //console.log("\n子弹攻击速度(方向)：", this.speedV3.elements)
        //用缩放方法去调整发射速度，0.2倍标准速度（注：子弹速度过快，可能会越过场景中物品，不发生碰撞！）
        //			Vector3.scale(speedV3,0.2,speedV3);
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
            LayaAir3D.isShoot = false;
            // 检测碰撞
            for (var i = 0; i < LayaAir3D.spArr.length; i++) {
                var obj = LayaAir3D.spArr[i];
                var chaX = Math.abs(obj.transform.position.x - this.bullet.transform.position.x);
                var chaY = Math.abs(obj.transform.position.y - this.bullet.transform.position.y);
                var chaZ = Math.abs(obj.transform.position.z - this.bullet.transform.position.z);
                var temporNums = Math.floor(obj.transform.position.y - 10);
                var newPos = new Laya.Vector3(obj.transform.position.x, temporNums, obj.transform.position.z);
                if (chaX < 0.5 && chaY < 0.5 && chaZ < 0.6) {
                    Laya.SoundManager.playSound("res/boom.wav");
                    // LayaAir3D.ani.play("A_run");
                    // Laya.Tween.to(obj.transform.position, { x: newPos.x, y: newPos.y, z: newPos.z }, 4000);
                    // Laya.Tween.to(LayaAir3D.layaDog.transform.position, { x: newPos.x, y: newPos.y, z: newPos.z },4000, Laya.Ease.linearIn);
                    // LayaAir3D.camera.removeAllComponent();
                    // LayaAir3D.camera.transform.lookAt(LayaAir3D.layaDog.transform.position,new Laya.Vector3(0,1,0));  
                    // LayaAir3D.camera.transform.position=new Laya.Vector3(LayaAir3D.layaDog.transform.position.x-4,LayaAir3D.layaDog.transform.position.y+4,LayaAir3D.layaDog.transform.position.z-6);
                    // LayaAir3D.camera.transform.rotate(new Laya.Vector3(30,200,0),false,false);   //45,180,0
                    // Laya.timer.once(2500, this, LayaAir3D.changeAni,[obj]);
                    var name_1 = obj.name;
                    if (Laya.stage.getChildIndex(LayaAir3D.scene) < 0) {
                    }
                    else {
                        LayaAir3D.Gyro = false;
                        var scene = new SceneLayer(name_1);
                    }
                    break;
                }
            }
        }
    };
    return BulletScript;
}(Laya.Script));
//# sourceMappingURL=BulletScript.js.map