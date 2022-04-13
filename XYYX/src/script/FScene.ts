export default class FScene extends Laya.Scene {
    constructor() {
        super();

        fgui.GRoot.inst.width = Laya.stage.width;
        fgui.GRoot.inst.height = Laya.stage.height;
        this.addChild(fgui.GRoot.inst.displayObject);
    }

    destroy(destroyChild?: boolean): void {
        fgui.GRoot.inst.removeChildren(0, -1, true);
        fgui.GRoot.inst.displayObject.removeSelf();
        super.destroy(destroyChild);
    }
}