/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_toast from "./UI_toast";
import UI_money from "./UI_money";

export default class CommonBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_toast.URL, UI_toast);
		fgui.UIObjectFactory.setExtension(UI_money.URL, UI_money);
	}
}