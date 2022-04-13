/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_charge from "./UI_charge";
import UI_charge_item from "./UI_charge_item";

export default class ChargeBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_charge.URL, UI_charge);
		fgui.UIObjectFactory.setExtension(UI_charge_item.URL, UI_charge_item);
	}
}