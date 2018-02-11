class BulletScript extends Laya.Script {
    /**被绑定的子弹对象**/
    private bullet: Laya.Sprite3D;
    /**子弹发射的速度（方向）**/
    public speedV3: Laya.Vector3 = new Laya.Vector3();
    /*
    子弹控制脚本
    */
    constructor() {
        super();
    }
    /**
	* 脚本实例化完成载入后调度
	* @param owner 脚本绑定的3D物体
	*/
    public _load(owner: Laya.ComponentNode): void {
        //获取子弹与子弹位置
        this.bullet = this.owner as Laya.Sprite3D;
    }

    /**
     * 设置子弹射击方向并计算速度
     * @param directionV3
     */
    public setShootDirection(directionV3: Laya.Vector3): void {
        //将方向向量归一成单位为一的方向速度向量(在LayaAir中相当于1米的长度)
        this.speedV3 = new Laya.Vector3(0, 0, 0);
        var vec: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.normalize(directionV3, vec);
        Laya.Vector3.scale(vec, 0.15, this.speedV3);
    }

    /**
     * 脚本帧循环更新
     */
    public _update(state: Laya.RenderState): void {
        //子弹位置更新
        this.bullet.transform.translate(this.speedV3, false);
        //生命周期递减
        if (this.bullet.transform.position.z < -4.5 || this.bullet.transform.position.z > 4.5 || this.bullet.transform.position.x > 10 || this.bullet.transform.position.x < -10 || this.bullet.transform.position.y > 10 || this.bullet.transform.position.y < -10) {
            this.bullet.removeSelf();
            GameConfig.isShoot = false;
            // 检测碰撞
            for (var i: number = 0; i < GameConfig.spArr.length; i++) {
                var obj: Laya.Sprite3D = GameConfig.spArr[i] as Laya.Sprite3D;
                let chaX: number = Math.abs(obj.transform.position.x - this.bullet.transform.position.x);
                let chaY: number = Math.abs(obj.transform.position.y - this.bullet.transform.position.y);
                let chaZ: number = Math.abs(obj.transform.position.z - this.bullet.transform.position.z);
                let temporNums: number = Math.floor(obj.transform.position.y - 10);
                let newPos: Laya.Vector3 = new Laya.Vector3(obj.transform.position.x, temporNums, obj.transform.position.z);
                if (chaX < 0.5 && chaY < 0.5 && chaZ < 0.6) {
                    Laya.SoundManager.playSound("res/music/boom.wav");
                    let name: string = obj.name;
                    if (Laya.stage.getChildIndex(GameConfig.mainScene) < 0) {
                        return;
                    } else {
                        GameConfig.mainCamera.removeAllComponent();
                        Laya.Gyroscope.instance.offAll(Laya.Event.CHANGE);
                        GameConfig.isShoot = true;
                        var scene: views.SceneLayer = new views.SceneLayer(name);
                    }
                    break;
                } else {
                    if (GameConfig.shootNums >= 10) {
                        Laya.SoundManager.playSound("res/music/boom.wav");
                        let name: string = "盒子";
                        if (Laya.stage.getChildIndex(GameConfig.mainScene) < 0) {
                            return;
                        } else {
                            GameConfig.mainCamera.removeAllComponent();
                            Laya.Gyroscope.instance.offAll(Laya.Event.CHANGE);
                            GameConfig.isShoot = true;
                            var scene: views.SceneLayer = new views.SceneLayer(name);
                        }
                        return;
                    }
                }
            }
        }
    }
}