namespace views {
    import subCtrl = controllers.SubCtrl;
    import GameMain = views.GameMain;
    import PrizeView = views.PrizeView;
    export class OpenView extends ui.RedBagOpenUI {

        private timeNum: number;
        private firstname: string;
        private phoneNums: string;
        private sex: string;
        private flag = false;
        private message = "";
        private gameUI: GameMain;
        private myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

        constructor(name: string) {
            super();
            if (laya.utils.Browser.onAndriod) {
                this.topBg.top = -80;
            } else if (laya.utils.Browser.onIOS) {
                this.topBg.top = -50;
            }
            this.timeNum = 60;
            this.name = "openView";
            Laya.stage.addChild(this);
            this.x = 0;
            this.province.on(Laya.Event.CHANGE, this, this.getCityList);
            this.cityList.on(Laya.Event.CHANGE, this, this.changeColor);
            this.submit.on(Laya.Event.MOUSE_DOWN, this, this.subUserInfo, [name]);  //提交用户信息
        }

        /** 提交信息，获取验证码 */
        subUserInfo(name: string): void {
            if (this.userName.text == "" || this.radioCheck.selectedIndex == -1 || this.province.selectedLabel == "请选择省份" || this.cityList.selectedLabel == "城市" || this.phoneNum.text == "") {
                alert("信息还未填写完整！");
                return;
            } else {
                if (this.phoneNum.text == laya.net.LocalStorage.getItem("phone")) {
                    alert("你已经提交过信息了！");
                    return;
                } else {
                    this.phoneNums = this.phoneNum.text;
                    if (this.phoneNums == "") {
                        this.message = "手机号码不能为空！";
                        this.alertMessage(this.message);
                    } else if (this.phoneNums.length != 11) {
                        this.message = "请输入11位手机号码！";
                        this.alertMessage(this.message);
                    } else if (!this.myreg.test(this.phoneNums)) {
                        this.message = "请输入有效的手机号码！";
                        this.alertMessage(this.message);
                    } else {
                        this.firstname = this.userName.text;
                        if (this.radioCheck.selectedIndex == 0) {
                            this.sex = "先生";
                        } else {
                            this.sex = "女士";
                        }
                        this.flag = true;
                        subCtrl.getInstance().subInfo(name, this.phoneNums, this.firstname, this.sex, this.province.selectedLabel, this.cityList.selectedLabel);
                        this.changePage(name);
                    }
                }
            }
        }

        /** 报错信息提示 */
        alertMessage(mesage: string): void {
            if (mesage != "") {
                alert(mesage);
            }
        }

        /** 获取城市列表 */
        getCityList(): void {
            if (this.province.selectedLabel == "请选择省份") {
                this.cityList.labels = "城市";
                this.cityList.selectedIndex = 0;
            } else {
                this.province.labelColors = "#ffffff,#c3acaa,#c3acaa,#c3acaa";
                let index: number = this.province.selectedIndex;
                subCtrl.getInstance().getCity(index);
                Laya.timer.once(1000, this, function () {
                    this.cityList.labels = GameConfig.cityStr;
                    this.cityList.selectedIndex = 0;
                });
            }
        }

        /** 切换页面 */
        changePage(name: string): void {
            this.visible = false;
            Laya.stage.removeChild(this);
            var prizeView: views.PrizeView = new views.PrizeView(name);
        }

        /** 改变颜色 */
        changeColor(): void {
            this.cityList.labelColors = "#ffffff,#c3acaa,#c3acaa,#c3acaa";
        }

        /** 回到主页面（暂未用到） */
        resetPage(): void {
            GameConfig.cityStr = "";
            this.cityList.labels = "";
            this.visible = false;
            Laya.stage.removeChild(this);
            if (Laya.stage.getChildByName("gameUI")) {
                console.log("已经有瞄准镜了");
                return;
            } else {
                var gameMain: GameMain = new GameMain();
                gameMain.name = "gameUI";
                Laya.stage.addChild(gameMain);
            }
            LayaAir3D.prototype.openCamera();
            GameConfig.mainCamera.addComponent(VRCameraMoveScript);
            Laya.timer.once(1000, this, function () {
                GameConfig.isShoot = false;
                GameConfig.giftOpen = false;
            });
        }
    }
}