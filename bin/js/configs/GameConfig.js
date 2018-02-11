var configs;
(function (configs) {
    /**
     * 游戏配置数据
     */
    var GameConfig = /** @class */ (function () {
        function GameConfig() {
        }
        ;
        /** 初始化配置 */
        GameConfig.init = function () {
        };
        GameConfig.PC = "PC";
        GameConfig.MOBILE = "Mobile";
        /** 当前游戏版本号 */
        GameConfig.GAME_VERSION = '1.0.0';
        /** 游戏主窗口宽度 */
        GameConfig.GAME_WINDOW_WIDTH = 600;
        /** 游戏主窗口高度 */
        GameConfig.GAME_WINDOW_HEIGHT = 800;
        /** 狗的模型 */
        GameConfig.layaDog = null;
        /** 红包是否打开标识 */
        GameConfig.giftOpen = false;
        /** 火箭是否发射标识 */
        GameConfig.isShoot = false;
        /** 射击次数 */
        GameConfig.shootNums = 0;
        /** 测试状态 */
        GameConfig.status = null;
        /** 城市列表 */
        GameConfig.cityStr = null;
        /** 获奖手机号 */
        GameConfig.prizeNum = "";
        return GameConfig;
    }());
    configs.GameConfig = GameConfig;
})(configs || (configs = {}));
//# sourceMappingURL=GameConfig.js.map