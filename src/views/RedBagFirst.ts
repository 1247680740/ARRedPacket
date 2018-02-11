namespace views {
    export class RedBagFirst extends ui.RedBagFirstUI {

        constructor(name: string) {
            super();
            this.name = "firstView";
            if (laya.utils.Browser.onIOS) {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.resetBG, [name]);
            } else {
                //    LayaAir3D.video.addEventListener('click', function(){
                //        LayaAir3D.resetBG(name);
                //    },true);  
                // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, LayaAir3D.resetBG, [name]);  //本地测试用
            }
        }
    }
}