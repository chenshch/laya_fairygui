/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_main extends fgui.GComponent {

	public m_btn_market:fgui.GButton;
	public m_btn_skill:fgui.GButton;
	public m_btn_task:fgui.GButton;
	public m_btn_sign:fgui.GButton;
	public m_btn_charge:fgui.GButton;
	public m_btn_make:fgui.GButton;
	public m_btn_equip:fgui.GButton;
	public m_btn_double:fgui.GButton;
	public m_btn_map:fgui.GButton;
	public m_money:fgui.GComponent;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://23p91tnxwvtod";

	public static createInstance():UI_main {
		return <UI_main>(fgui.UIPackage.createObject("Main", "main"));
	}

	protected onConstruct():void {
		this.m_btn_market = <fgui.GButton>(this.getChild("btn_market"));
		this.m_btn_skill = <fgui.GButton>(this.getChild("btn_skill"));
		this.m_btn_task = <fgui.GButton>(this.getChild("btn_task"));
		this.m_btn_sign = <fgui.GButton>(this.getChild("btn_sign"));
		this.m_btn_charge = <fgui.GButton>(this.getChild("btn_charge"));
		this.m_btn_make = <fgui.GButton>(this.getChild("btn_make"));
		this.m_btn_equip = <fgui.GButton>(this.getChild("btn_equip"));
		this.m_btn_double = <fgui.GButton>(this.getChild("btn_double"));
		this.m_btn_map = <fgui.GButton>(this.getChild("btn_map"));
		this.m_money = <fgui.GComponent>(this.getChild("money"));
		this.m_t0 = this.getTransition("t0");
	}
}