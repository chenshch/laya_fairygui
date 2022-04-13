export default class CUtils {
    constructor() {

    }

    static fadeScene() {
        let sp = new Laya.Sprite();
        sp.graphics.drawRect(0,0,Laya.stage.width, Laya.stage.height,"#000000");
        sp.alpha = 1;
        sp.zOrder = 1001;
        Laya.stage.addChild(sp);
        Laya.Tween.to(sp, { alpha: 0 }, 300, null, Laya.Handler.create(this, function () {
            sp.removeSelf();
        }), 200);
    }

    static popUI(obj: fgui.GObject) {
        let old_s_x = obj.scaleX;
        let old_s_y = obj.scaleY;
        obj.setPivot(0.5, 0.5);
        obj.setScale(0.1, 0.1);
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("scale_big", 0).to(obj, { scaleX: old_s_x * 1.05, scaleY: old_s_y * 1.05 }, 200).addLabel("scale_small", 0).to(obj,
            { scaleX: old_s_x * 0.95, scaleY: old_s_y * 0.95 }, 100).addLabel("scale_noraml", 0).to(obj,
                { scaleX: old_s_x, scaleY: old_s_y }, 100);
        timeLine.on(Laya.Event.COMPLETE, this, function () {
            timeLine.destroy();
        });
        timeLine.play(0, false);
    }

    static random_int(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getDay(time: number): number {
        let t = time + 8 * 3600 * 1000;
        let d = t / (24 * 3600 * 1000);
        return Math.floor(d);
    }

    static getDelay(t1: number, t2: number): number {
        let d1 = CUtils.getDay(t1);
        let d2 = CUtils.getDay(t2);
        return d1 - d2;
    }

    static isToday(time: number): boolean {
        return CUtils.getDelay(time, Laya.Browser.now()) == 0;
    }

    static colorString(color: Laya.Color): string {
        let red: string = (color.r >> 16 & 0xFF).toString(16);
        let green: string = (color.g >> 8 & 0xFF).toString(16);
        let blue: string = (color.b & 0xFF).toString(16);
        let alpha: string = (color.a & 0xFF).toString(16);
        if (alpha.length == 1)
            alpha = "0" + alpha;
        if (red.length == 1)
            red = "0" + red;
        if (green.length == 1)
            green = "0" + green;
        if (blue.length == 1)
            blue = "0" + blue;
        return "#" + alpha + red + green + blue;
    }
}