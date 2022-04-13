import UI_money from "../fui/Common/UI_money";
import MainBinder from "../fui/Main/MainBinder";
import UI_main from "../fui/Main/UI_main";
import BaseWindow from "./BaseWindow";
import CUtils from "./CUtils";
import Toast from "./Toast";
import UIMgr from "./UIMgr";

export default class MainScene extends BaseWindow{
    constructor(){
        super();
        this.pkg_name = "res/Main";
        this.win_name = "main"
        this.m_remove_pkg = true;
    }

    protected onCreate(): void {
        let sc = <UI_main>(this.contentPane);
        let money = <UI_money>(sc.m_money);
        money.m_btn_add_diamon.onClick(this,this.addDiamondEvent);
        sc.m_btn_sign.onClick(this,this.signEvent);
        sc.m_btn_charge.onClick(this,this.addDiamondEvent);
        sc.m_btn_map.onClick(this,this.mapEvent);
        sc.m_btn_task.onClick(this,this.taskEvent);
        sc.m_btn_skill.onClick(this,this.skillEvent);
        sc.m_btn_double.onClick(this,this.doubleEvent);
        sc.m_btn_equip.onClick(this,this.equipEvent);
        sc.m_btn_market.onClick(this,this.marketEvent);
        sc.m_btn_make.onClick(this,this.makeEvent);

        this.notify_update_money();
    }

    protected createWin(){
        MainBinder.bindAll();
        this.contentPane = UI_main.createInstance();
    }

    private addDiamondEvent(){
        UIMgr.instance.openUI("Charge");
    }

    private signEvent(){
        UIMgr.instance.openUI("Sign");
    }

    private mapEvent(){
        UIMgr.instance.openUI("MapWindow");
    }

    private taskEvent(){

    }

    private skillEvent(){
    }

    private doubleEvent(){

    }

    private equipEvent(){

    }

    private marketEvent(){
        
    }

    private makeEvent(){

    }

    private notify_update_money(){
        let sc = <UI_main>(this.contentPane);
        let money = <UI_money>(sc.m_money);

        let gold = 1000;
        money.m_lab_money.text = gold.toString();
    }
}