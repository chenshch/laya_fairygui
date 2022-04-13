/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_toast extends fgui.GComponent {

	public m_t0:fgui.Transition;
	public static URL:string = "ui://cx5zh13dwvto3";

	public static createInstance():UI_toast {
		return <UI_toast>(fgui.UIPackage.createObject("Common", "toast"));
	}

	protected onConstruct():void {
		this.m_t0 = this.getTransition("t0");
	}
}