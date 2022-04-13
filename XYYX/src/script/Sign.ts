import SignBinder from "../fui/Sign/SignBinder";
import UI_sign from "../fui/Sign/UI_sign";
import BaseWindow from "./BaseWindow";
import CUtils from "./CUtils";
import Toast from "./Toast";

export default class Sign extends BaseWindow {
    constructor() {
        super();
        this.m_full = false;
        this.m_pop = true;
        this.pkg_name = "res/Sign";
        this.win_name = "sign";
    }

    protected onCreate(): void {
        let sign = <UI_sign>(this.contentPane);
        sign.m_btn_sign.onClick(this, this.signEvent);
        this.closeButton = sign.m_btn_close;
    }

    protected createWin(): void {
        SignBinder.bindAll();
        this.contentPane = UI_sign.createInstance();
    }

    private signEvent() {
        this.hide();
    }
}