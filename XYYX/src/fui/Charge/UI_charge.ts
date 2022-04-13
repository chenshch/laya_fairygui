/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_charge extends fgui.GComponent {

	public m_list_charge:fgui.GList;
	public m_btn_close:fgui.GButton;
	public static URL:string = "ui://cfw84oa2pcto9";

	public static createInstance():UI_charge {
		return <UI_charge>(fgui.UIPackage.createObject("Charge", "charge"));
	}

	protected onConstruct():void {
		this.m_list_charge = <fgui.GList>(this.getChild("list_charge"));
		this.m_btn_close = <fgui.GButton>(this.getChild("btn_close"));
	}
}