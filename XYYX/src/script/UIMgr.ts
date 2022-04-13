
export default class UIMgr {
    static _instance: UIMgr = null;
    constructor() {

    }

    static get instance(): UIMgr {
        if (this._instance == void 0) {
            this._instance = new UIMgr();
        }
        return this._instance;
    }

    openUI(name: string, args?: any[], new_scene?: boolean): any {
        let cls = Laya.ClassUtils.getClass(name);
        if (cls == void 0)
            return;
        let win = new cls(args);
        win.loadUI(new_scene);
        return win;
    }
}