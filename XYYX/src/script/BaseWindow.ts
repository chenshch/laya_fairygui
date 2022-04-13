import CUtils from "./CUtils";
import EventMgr from "./EventMgr";
import FScene from "./FScene";

export default class BaseWindow extends fgui.Window {
    protected pkg_name: string = "";
    protected win_name: string = "";
    protected m_full: boolean = true;
    protected m_pop: boolean = false;
    protected m_remove_pkg: boolean = false;
    constructor() {
        super();
    }

    loadUI(scene?: boolean) {
        fgui.UIPackage.loadPackage(this.pkg_name, Laya.Handler.create(this, this._onUILoaded, [scene]));
    }

    private _onUILoaded(scene: boolean) {
        if (scene) {
            this.addToNewScene();
        } else {
            this.show();
        }
    }

    onInit() {
        super.onInit();
        this.createWin();
        if (this.contentPane == void 0)
            return;
        if (this.m_full) {
            this.contentPane.makeFullScreen();
            this.bringToFontOnClick = false;
        } else {
            this.center();
            this.modal = true;
        }
        this.onCreate();
    }

    protected onCreate() {

    }

    protected createWin() {
        let str_pkg = this.pkg_name.replace("res/", "");
        this.contentPane = fgui.UIPackage.createObject(str_pkg, this.win_name).asCom;
    }

    protected doShowAnimation(): void {
        if (this.m_pop) {
            let old_sx = this.scaleX;
            let old_sy = this.scaleY;
            this.setPivot(0.5, 0.5);
            this.setScale(0.1, 0.1);
            let timeline = Laya.TimeLine.to(this, { scaleX: old_sx * 1.05, scaleY: old_sy * 1.05 }, 200).to(this, { scaleX: old_sx * 0.95, scaleY: old_sy * 0.95 }, 100).to(this, { scaleX: old_sx * 1, scaleY: old_sy * 1 }, 100);
            timeline.on(Laya.Event.COMPLETE, this, this.onShown);
            timeline.play(1, false);
        } else {
            this.onShown();
        }
    }

    addToNewScene() {
        let old_scene = Laya.stage.getChildByName("fscene");
        if (old_scene) {
            old_scene.destroy(true);
        }
        let fscene = new FScene();
        fscene.name = "fscene";
        Laya.stage.addChild(fscene);
        CUtils.fadeScene();
        this.show();
    }

    protected onHide(): void {
        EventMgr.instance.offAllCaller(this);
        if (this.m_remove_pkg)
            fgui.UIPackage.removePackage(this.pkg_name);
    }
}