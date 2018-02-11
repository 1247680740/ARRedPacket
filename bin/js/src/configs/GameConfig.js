var configs;
(function (configs) {
    /**
     * 游戏配置数据
     */
    var GameConfig = /** @class */ (function () {
        function GameConfig() {
        }
        /**
         * 初始化配置
         */
        GameConfig.init = function () {
        };
        GameConfig.PC = "PC";
        GameConfig.MOBILE = "Mobile";
        /**
         * 当前游戏版本号
         */
        GameConfig.GAME_VERSION = '1.0.0';
        /**
         * 密钥串(与服务器校验)
         */
        GameConfig.PRIVATE_KEY = 'bobo';
        /**
         * 游戏主窗口宽度
         */
        GameConfig.GAME_WINDOW_WIDTH = 600;
        /**
         * 游戏主窗口高度
         */
        GameConfig.GAME_WINDOW_HEIGHT = 800;
        GameConfig.areaId = { "teaArea": 1, "chaoArea": 2, "paoArea": 3 };
        return GameConfig;
    }());
    configs.GameConfig = GameConfig;
})(configs || (configs = {}));
//# sourceMappingURL=GameConfig.js.map