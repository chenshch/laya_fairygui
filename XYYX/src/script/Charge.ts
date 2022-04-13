import ChargeBinder from "../fui/Charge/ChargeBinder";
import UI_charge from "../fui/Charge/UI_charge";
import UI_charge_item from "../fui/Charge/UI_charge_item";
import BaseWindow from "./BaseWindow";

export default class Charge extends BaseWindow {
    private ids: Array<number> = [6, 30, 68, 98, 128, 198, 258, 328, 488, 648];
    private prices: Array<number> = [6, 30, 68, 98, 128, 198, 258, 328, 488, 648];
    constructor() {
        super();
        this.m_full = false;
        this.m_pop = true;
        this.pkg_name = "res/Charge";
        this.win_name = "charge";
    }

    protected onCreate(): void {
        let charge = <UI_charge>(this.contentPane);
        charge.m_btn_close.onClick(this, this.closeEvent);
        charge.m_list_charge.itemRenderer = Laya.Handler.create(this, this.listRender, null, false);
        charge.m_list_charge.on(fgui.Events.CLICK_ITEM, this, this.listClick);
        charge.m_list_charge.numItems = this.ids.length;
    }

    protected createWin() {
        ChargeBinder.bindAll();
        this.contentPane = UI_charge.createInstance();
    }

    closeEvent() {
        this.hide();
    }

    listRender(index: number, item: fgui.GObject) {
        let com = <UI_charge_item>(item.asCom);
        com.m_load_icon.icon = `ui://Charge/gold${index + 1}`;
        com.m_btn_buy.title = `￥${this.prices[index]}`;
        let count = this.ids[index] * 10;
        com.m_lab_count.text = count.toString();

        com.m_btn_buy.off(Laya.Event.CLICK,this,this.btn_buy);
        com.m_btn_buy.on(Laya.Event.CLICK,this,this.btn_buy,[index]);
    }

    btn_buy(index:number){
        let id = this.ids[index];
    }

    listClick(item: fgui.GObject, evt:Laya.Event) {
        let name = evt.target.name;
        let charge = <UI_charge>(this.contentPane);

        let index = charge.m_list_charge.childIndexToItemIndex(charge.m_list_charge.getChildIndex(item));
        if(name == ""){
            this.btn_buy(index);
        }
    }
}