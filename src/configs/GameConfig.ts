namespace configs {
    /**
     * 游戏配置数据
     */
    export class GameConfig {
        /**
         * 设备类型：PC or Mobile
         */
        static device_type: string;
        static PC: string = "PC";
        static MOBILE: string = "Mobile";

        /** 当前游戏版本号 */
        static GAME_VERSION: string = '1.0.0';

        /** 游戏主窗口宽度 */
        static GAME_WINDOW_WIDTH: number = 600;

        /** 游戏主窗口高度 */
        static GAME_WINDOW_HEIGHT: number = 800;

        /** 应用服务器地址 */
        static appAddress: string;

        /** 应用服务器端口 */
        static appPort: string;

        /** 服务器下的静态资源路径  */
        static resourceAddress: string;

        /** 当前操作类型 */
        static curOperateType: string;

        /** 主场景 */
        static mainScene: Laya.Scene;

        /** 主相机 */
        static mainCamera: Laya.Camera;

        /** 漂浮物集合 */
        static spArr: Array<Laya.Sprite3D>;;

        /** 狗的模型 */
        static layaDog: Laya.Sprite3D = null;

        /** 狗的动画 */
        static ani: Laya.Animator;

        /** 狗的位置 */
        static dogPos: Laya.Vector3;

        /**射线**/
        static ray: Laya.Ray;

        /**鼠标坐标**/
        static mousePos: Laya.Vector2;

        /**碰撞信息**/
        static rayCastHit: Laya.RaycastHit;

        /** 漂浮物原坐标及原坐标集合 */
        static oldVec: Laya.Vector3;
        static oldArr: Array<Laya.Vector3>;

        /** 漂浮物新坐标 */
        static newVec: Laya.Vector3;

        /** 红包是否打开标识 */
        static giftOpen: boolean = false;

        /** 火箭是否发射标识 */
        static isShoot: boolean = false;

        /** 射击次数 */
        static shootNums:number = 0;

        /** 测试状态 */
        static status:string = null;

        /** 城市列表 */
        static cityStr:string = null;

        /** 获奖手机号 */
        static prizeNum:string = "";
        
        /** 初始化配置 */
        static init(): void {

        }

    }
}
