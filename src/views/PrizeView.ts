namespace views {

    import HTMLCanvas = laya.resource.HTMLCanvas;
    import Sprite = laya.display.Sprite;
    import Browser = laya.utils.Browser;
    import Texture = laya.resource.Texture;

    export class PrizeView extends ui.PrizePageUI {

        private timeNum: number = 1;
        private sp: Sprite;

        constructor(name) {
            super();
            this.sp = new Sprite();
            Laya.stage.addChild(this);
            if (laya.utils.Browser.onAndriod){
                this.topBg.top = -16;
                this.x = -2;
                this.y= 16;
            } 
            // this.tauch.on(Laya.Event.CLICK,this,this.changePage,[name]);
            // this.on(Laya.Event.MOUSE_DOWN, this, this.screenShot);
        }

        /** 切换页面（暂未用到） */
        changePage(name: string): void {
            this.visible = false;
            Laya.stage.removeChild(this);
            var openView: views.OpenView = new views.OpenView(name);
        }

        /** 截屏操作（暂未用到） */
        screenShot(): void {
            Laya.timer.loop(1000, this, () => {
                this.timeNum++;
                if (this.timeNum > 2) {
                    Laya.timer.clearAll(this);
                   let htmlC: HTMLCanvas = this.drawToCanvas(Browser.width, Browser.height, 0, 0);
                   /** 获取截屏区域，及保存的图片base64信息 */
                   var canvas:any = htmlC.getCanvas();
                   let imgData:string = canvas.toDataURL();
                   /** 将图片信息传到服务器上 */

                    //将获取的截屏图片显示在舞台上
                    var _texture: Texture = new Texture(htmlC);
                    //将截屏的texture进行draw绘制并显示到舞台
                    var sp2: Sprite = new Sprite();
                    sp2.graphics.drawTexture(_texture, 0, 0, 700, 1000);
                    sp2.x = 10;
                    Laya.stage.addChild(sp2);
                }
            });
        }

    }
}