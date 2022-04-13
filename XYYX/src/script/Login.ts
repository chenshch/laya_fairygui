import CommonBinder from "../fui/Common/CommonBinder";
import LoginBinder from "../fui/Login/LoginBinder";
import UI_login from "../fui/Login/UI_login";
import BaseWindow from "./BaseWindow";
import UIMgr from "./UIMgr";

export default class Login extends BaseWindow {
    constructor() {
        super();
        this.pkg_name = "res/Login";
        this.win_name = "login";
        this.m_remove_pkg = true;
    }

    protected onCreate(): void {
        let login = <UI_login>(this.contentPane);
        login.m_btn_login.onClick(this, this.loginEvent);
    }

    protected createWin() {
        LoginBinder.bindAll();
        CommonBinder.bindAll();
        this.contentPane = UI_login.createInstance();
    }

    private loginEvent() {
        UIMgr.instance.openUI("MainScene", null, true);
    }
}