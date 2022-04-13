import MapBinder from "../fui/Map/MapBinder";
import UI_map from "../fui/Map/UI_map";
import BaseWindow from "./BaseWindow";

export default class MapWindow extends BaseWindow {
    private m_stars: number[] = [];
    constructor() {
        super();

        this.pkg_name = "res/Map";
        this.win_name = "map";
    }

    protected onCreate(): void {
        let map = <UI_map>(this.contentPane);
        map.m_btn_back.onClick(this, this.backEvent);
    }

    protected createWin(): void {
        MapBinder.bindAll();
        this.contentPane = UI_map.createInstance();
    }

    private backEvent() {
        this.hide();
    }
}