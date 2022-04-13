/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_charge_item extends fgui.GButton {

	public m_load_icon:fgui.GLoader;
	public m_btn_buy:fgui.GButton;
	public m_lab_count:fgui.GTextField;
	public static URL:string = "ui://cfw84oa2pctoa";

	public static createInstance():UI_charge_item {
		return <UI_charge_item>(fgui.UIPackage.createObject("Charge", "charge_item"));
	}

	protected onConstruct():void {
		this.m_load_icon = <fgui.GLoader>(this.getChild("load_icon"));
		this.m_btn_buy = <fgui.GButton>(this.getChild("btn_buy"));
		this.m_lab_count = <fgui.GTextField>(this.getChild("lab_count"));
	}
}