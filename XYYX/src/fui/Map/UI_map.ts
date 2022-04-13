/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_map_item from "./UI_map_item";

export default class UI_map extends fgui.GComponent {

	public m_btn_back:fgui.GButton;
	public m_map0:UI_map_item;
	public m_map1:UI_map_item;
	public m_map2:UI_map_item;
	public m_map3:UI_map_item;
	public m_map4:UI_map_item;
	public m_map5:UI_map_item;
	public m_map6:UI_map_item;
	public m_map7:UI_map_item;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://2hpj09q8wvto7";

	public static createInstance():UI_map {
		return <UI_map>(fgui.UIPackage.createObject("Map", "map"));
	}

	protected onConstruct():void {
		this.m_btn_back = <fgui.GButton>(this.getChild("btn_back"));
		this.m_map0 = <UI_map_item>(this.getChild("map0"));
		this.m_map1 = <UI_map_item>(this.getChild("map1"));
		this.m_map2 = <UI_map_item>(this.getChild("map2"));
		this.m_map3 = <UI_map_item>(this.getChild("map3"));
		this.m_map4 = <UI_map_item>(this.getChild("map4"));
		this.m_map5 = <UI_map_item>(this.getChild("map5"));
		this.m_map6 = <UI_map_item>(this.getChild("map6"));
		this.m_map7 = <UI_map_item>(this.getChild("map7"));
		this.m_t0 = this.getTransition("t0");
	}
}