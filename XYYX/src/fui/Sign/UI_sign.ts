/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_sign extends fgui.GComponent {

	public m_btn_sign:fgui.GButton;
	public m_lab_count:fgui.GTextField;
	public m_btn_close:fgui.GButton;
	public static URL:string = "ui://2gjcupndwvto3";

	public static createInstance():UI_sign {
		return <UI_sign>(fgui.UIPackage.createObject("Sign", "sign"));
	}

	protected onConstruct():void {
		this.m_btn_sign = <fgui.GButton>(this.getChild("btn_sign"));
		this.m_lab_count = <fgui.GTextField>(this.getChild("lab_count"));
		this.m_btn_close = <fgui.GButton>(this.getChild("btn_close"));
	}
}