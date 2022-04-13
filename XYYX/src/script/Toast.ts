import UI_toast from "../fui/Common/UI_toast";

export default class Toast {

    static _instance: Toast = null;
    constructor() {

    }

    static get instance(): Toast {
        if (this._instance == void 0) {
            this._instance = new Toast();
        }
        return this._instance;
    }

    showString(str: string, color:string = "#00ff00") {
        let obj: fgui.GComponent = Laya.Pool.getItemByCreateFun("toast_pool", function () {
            return UI_toast.createInstance();
        });

        fgui.GRoot.inst.addChild(obj);
        obj.center();
        obj.visible = true;
        let lab_text = obj.getChild("n1").asLabel;
        lab_text.text = str;
        lab_text.color = color;

        let trans = obj.getTransition("t0");
        trans.play(Laya.Handler.create(this, function () {
            obj.visible = false;
            obj.removeFromParent();
            Laya.Pool.recover("toast_pool", obj);
        }));
    }
}