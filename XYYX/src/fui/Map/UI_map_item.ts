/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_map_item extends fgui.GComponent {

	public m_star1:fgui.GLoader;
	public m_star2:fgui.GLoader;
	public m_star3:fgui.GLoader;
	public m_lab_pass:fgui.GTextField;
	public static URL:string = "ui://2hpj09q8wvto8";

	public static createInstance():UI_map_item {
		return <UI_map_item>(fgui.UIPackage.createObject("Map", "map_item"));
	}

	protected onConstruct():void {
		this.m_star1 = <fgui.GLoader>(this.getChild("star1"));
		this.m_star2 = <fgui.GLoader>(this.getChild("star2"));
		this.m_star3 = <fgui.GLoader>(this.getChild("star3"));
		this.m_lab_pass = <fgui.GTextField>(this.getChild("lab_pass"));
	}
}