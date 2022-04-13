/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_money extends fgui.GComponent {

	public m_btn_add_diamon:fgui.GButton;
	public m_lab_money:fgui.GTextField;
	public static URL:string = "ui://cx5zh13dwvtos";

	public static createInstance():UI_money {
		return <UI_money>(fgui.UIPackage.createObject("Common", "money"));
	}

	protected onConstruct():void {
		this.m_btn_add_diamon = <fgui.GButton>(this.getChild("btn_add_diamon"));
		this.m_lab_money = <fgui.GTextField>(this.getChild("lab_money"));
	}
}