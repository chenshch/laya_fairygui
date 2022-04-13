/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_login extends fgui.GComponent {

	public m_btn_login:fgui.GButton;
	public static URL:string = "ui://cohy6d8opcto3";

	public static createInstance():UI_login {
		return <UI_login>(fgui.UIPackage.createObject("Login", "login"));
	}

	protected onConstruct():void {
		this.m_btn_login = <fgui.GButton>(this.getChild("btn_login"));
	}
}