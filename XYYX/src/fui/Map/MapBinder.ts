/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_map from "./UI_map";
import UI_map_item from "./UI_map_item";

export default class MapBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_map.URL, UI_map);
		fgui.UIObjectFactory.setExtension(UI_map_item.URL, UI_map_item);
	}
}