(function () {
    'use strict';

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 1280;
    GameConfig.height = 720;
    GameConfig.scaleMode = "fixedauto";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class UI_charge extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Charge", "charge"));
        }
        onConstruct() {
            this.m_list_charge = (this.getChild("list_charge"));
            this.m_btn_close = (this.getChild("btn_close"));
        }
    }
    UI_charge.URL = "ui://cfw84oa2pcto9";

    class UI_charge_item extends fgui.GButton {
        static createInstance() {
            return (fgui.UIPackage.createObject("Charge", "charge_item"));
        }
        onConstruct() {
            this.m_load_icon = (this.getChild("load_icon"));
            this.m_btn_buy = (this.getChild("btn_buy"));
            this.m_lab_count = (this.getChild("lab_count"));
        }
    }
    UI_charge_item.URL = "ui://cfw84oa2pctoa";

    class ChargeBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_charge.URL, UI_charge);
            fgui.UIObjectFactory.setExtension(UI_charge_item.URL, UI_charge_item);
        }
    }

    class CUtils {
        constructor() {
        }
        static fadeScene() {
            let sp = new Laya.Sprite();
            sp.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            sp.alpha = 1;
            sp.zOrder = 1001;
            Laya.stage.addChild(sp);
            Laya.Tween.to(sp, { alpha: 0 }, 300, null, Laya.Handler.create(this, function () {
                sp.removeSelf();
            }), 200);
        }
        static popUI(obj) {
            let old_s_x = obj.scaleX;
            let old_s_y = obj.scaleY;
            obj.setPivot(0.5, 0.5);
            obj.setScale(0.1, 0.1);
            let timeLine = new Laya.TimeLine();
            timeLine.addLabel("scale_big", 0).to(obj, { scaleX: old_s_x * 1.05, scaleY: old_s_y * 1.05 }, 200).addLabel("scale_small", 0).to(obj, { scaleX: old_s_x * 0.95, scaleY: old_s_y * 0.95 }, 100).addLabel("scale_noraml", 0).to(obj, { scaleX: old_s_x, scaleY: old_s_y }, 100);
            timeLine.on(Laya.Event.COMPLETE, this, function () {
                timeLine.destroy();
            });
            timeLine.play(0, false);
        }
        static random_int(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        static getDay(time) {
            let t = time + 8 * 3600 * 1000;
            let d = t / (24 * 3600 * 1000);
            return Math.floor(d);
        }
        static getDelay(t1, t2) {
            let d1 = CUtils.getDay(t1);
            let d2 = CUtils.getDay(t2);
            return d1 - d2;
        }
        static isToday(time) {
            return CUtils.getDelay(time, Laya.Browser.now()) == 0;
        }
        static colorString(color) {
            let red = (color.r >> 16 & 0xFF).toString(16);
            let green = (color.g >> 8 & 0xFF).toString(16);
            let blue = (color.b & 0xFF).toString(16);
            let alpha = (color.a & 0xFF).toString(16);
            if (alpha.length == 1)
                alpha = "0" + alpha;
            if (red.length == 1)
                red = "0" + red;
            if (green.length == 1)
                green = "0" + green;
            if (blue.length == 1)
                blue = "0" + blue;
            return "#" + alpha + red + green + blue;
        }
    }

    class EventMgr extends Laya.EventDispatcher {
        constructor() {
            super();
        }
        static get instance() {
            if (this._instance == null) {
                this._instance = new EventMgr();
            }
            return this._instance;
        }
    }
    EventMgr._instance = null;

    class FScene extends Laya.Scene {
        constructor() {
            super();
            fgui.GRoot.inst.width = Laya.stage.width;
            fgui.GRoot.inst.height = Laya.stage.height;
            this.addChild(fgui.GRoot.inst.displayObject);
        }
        destroy(destroyChild) {
            fgui.GRoot.inst.removeChildren(0, -1, true);
            fgui.GRoot.inst.displayObject.removeSelf();
            super.destroy(destroyChild);
        }
    }

    class BaseWindow extends fgui.Window {
        constructor() {
            super();
            this.pkg_name = "";
            this.win_name = "";
            this.m_full = true;
            this.m_pop = false;
            this.m_remove_pkg = false;
        }
        loadUI(scene) {
            fgui.UIPackage.loadPackage(this.pkg_name, Laya.Handler.create(this, this._onUILoaded, [scene]));
        }
        _onUILoaded(scene) {
            if (scene) {
                this.addToNewScene();
            }
            else {
                this.show();
            }
        }
        onInit() {
            super.onInit();
            this.createWin();
            if (this.contentPane == void 0)
                return;
            if (this.m_full) {
                this.contentPane.makeFullScreen();
                this.bringToFontOnClick = false;
            }
            else {
                this.center();
                this.modal = true;
            }
            this.onCreate();
        }
        onCreate() {
        }
        createWin() {
            let str_pkg = this.pkg_name.replace("res/", "");
            this.contentPane = fgui.UIPackage.createObject(str_pkg, this.win_name).asCom;
        }
        doShowAnimation() {
            if (this.m_pop) {
                let old_sx = this.scaleX;
                let old_sy = this.scaleY;
                this.setPivot(0.5, 0.5);
                this.setScale(0.1, 0.1);
                let timeline = Laya.TimeLine.to(this, { scaleX: old_sx * 1.05, scaleY: old_sy * 1.05 }, 200).to(this, { scaleX: old_sx * 0.95, scaleY: old_sy * 0.95 }, 100).to(this, { scaleX: old_sx * 1, scaleY: old_sy * 1 }, 100);
                timeline.on(Laya.Event.COMPLETE, this, this.onShown);
                timeline.play(1, false);
            }
            else {
                this.onShown();
            }
        }
        addToNewScene() {
            let old_scene = Laya.stage.getChildByName("fscene");
            if (old_scene) {
                old_scene.destroy(true);
            }
            let fscene = new FScene();
            fscene.name = "fscene";
            Laya.stage.addChild(fscene);
            CUtils.fadeScene();
            this.show();
        }
        onHide() {
            EventMgr.instance.offAllCaller(this);
            if (this.m_remove_pkg)
                fgui.UIPackage.removePackage(this.pkg_name);
        }
    }

    class Charge extends BaseWindow {
        constructor() {
            super();
            this.ids = [6, 30, 68, 98, 128, 198, 258, 328, 488, 648];
            this.prices = [6, 30, 68, 98, 128, 198, 258, 328, 488, 648];
            this.m_full = false;
            this.m_pop = true;
            this.pkg_name = "res/Charge";
            this.win_name = "charge";
        }
        onCreate() {
            let charge = (this.contentPane);
            charge.m_btn_close.onClick(this, this.closeEvent);
            charge.m_list_charge.itemRenderer = Laya.Handler.create(this, this.listRender, null, false);
            charge.m_list_charge.on(fgui.Events.CLICK_ITEM, this, this.listClick);
            charge.m_list_charge.numItems = this.ids.length;
        }
        createWin() {
            ChargeBinder.bindAll();
            this.contentPane = UI_charge.createInstance();
        }
        closeEvent() {
            this.hide();
        }
        listRender(index, item) {
            let com = (item.asCom);
            com.m_load_icon.icon = `ui://Charge/gold${index + 1}`;
            com.m_btn_buy.title = `￥${this.prices[index]}`;
            let count = this.ids[index] * 10;
            com.m_lab_count.text = count.toString();
            com.m_btn_buy.off(Laya.Event.CLICK, this, this.btn_buy);
            com.m_btn_buy.on(Laya.Event.CLICK, this, this.btn_buy, [index]);
        }
        btn_buy(index) {
            let id = this.ids[index];
        }
        listClick(item, evt) {
            let name = evt.target.name;
            let charge = (this.contentPane);
            let index = charge.m_list_charge.childIndexToItemIndex(charge.m_list_charge.getChildIndex(item));
            if (name == "") {
                this.btn_buy(index);
            }
        }
    }

    class UI_toast extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Common", "toast"));
        }
        onConstruct() {
            this.m_t0 = this.getTransition("t0");
        }
    }
    UI_toast.URL = "ui://cx5zh13dwvto3";

    class UI_money extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Common", "money"));
        }
        onConstruct() {
            this.m_btn_add_diamon = (this.getChild("btn_add_diamon"));
            this.m_lab_money = (this.getChild("lab_money"));
        }
    }
    UI_money.URL = "ui://cx5zh13dwvtos";

    class CommonBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_toast.URL, UI_toast);
            fgui.UIObjectFactory.setExtension(UI_money.URL, UI_money);
        }
    }

    class UI_login extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Login", "login"));
        }
        onConstruct() {
            this.m_btn_login = (this.getChild("btn_login"));
        }
    }
    UI_login.URL = "ui://cohy6d8opcto3";

    class LoginBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_login.URL, UI_login);
        }
    }

    class UIMgr {
        constructor() {
        }
        static get instance() {
            if (this._instance == void 0) {
                this._instance = new UIMgr();
            }
            return this._instance;
        }
        openUI(name, args, new_scene) {
            let cls = Laya.ClassUtils.getClass(name);
            if (cls == void 0)
                return;
            let win = new cls(args);
            win.loadUI(new_scene);
            return win;
        }
    }
    UIMgr._instance = null;

    class Login extends BaseWindow {
        constructor() {
            super();
            this.pkg_name = "res/Login";
            this.win_name = "login";
            this.m_remove_pkg = true;
        }
        onCreate() {
            let login = (this.contentPane);
            login.m_btn_login.onClick(this, this.loginEvent);
        }
        createWin() {
            LoginBinder.bindAll();
            CommonBinder.bindAll();
            this.contentPane = UI_login.createInstance();
        }
        loginEvent() {
            UIMgr.instance.openUI("MainScene", null, true);
        }
    }

    class UI_main extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Main", "main"));
        }
        onConstruct() {
            this.m_btn_market = (this.getChild("btn_market"));
            this.m_btn_skill = (this.getChild("btn_skill"));
            this.m_btn_task = (this.getChild("btn_task"));
            this.m_btn_sign = (this.getChild("btn_sign"));
            this.m_btn_charge = (this.getChild("btn_charge"));
            this.m_btn_make = (this.getChild("btn_make"));
            this.m_btn_equip = (this.getChild("btn_equip"));
            this.m_btn_double = (this.getChild("btn_double"));
            this.m_btn_map = (this.getChild("btn_map"));
            this.m_money = (this.getChild("money"));
            this.m_t0 = this.getTransition("t0");
        }
    }
    UI_main.URL = "ui://23p91tnxwvtod";

    class MainBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_main.URL, UI_main);
        }
    }

    class MainScene extends BaseWindow {
        constructor() {
            super();
            this.pkg_name = "res/Main";
            this.win_name = "main";
            this.m_remove_pkg = true;
        }
        onCreate() {
            let sc = (this.contentPane);
            let money = (sc.m_money);
            money.m_btn_add_diamon.onClick(this, this.addDiamondEvent);
            sc.m_btn_sign.onClick(this, this.signEvent);
            sc.m_btn_charge.onClick(this, this.addDiamondEvent);
            sc.m_btn_map.onClick(this, this.mapEvent);
            sc.m_btn_task.onClick(this, this.taskEvent);
            sc.m_btn_skill.onClick(this, this.skillEvent);
            sc.m_btn_double.onClick(this, this.doubleEvent);
            sc.m_btn_equip.onClick(this, this.equipEvent);
            sc.m_btn_market.onClick(this, this.marketEvent);
            sc.m_btn_make.onClick(this, this.makeEvent);
            this.notify_update_money();
        }
        createWin() {
            MainBinder.bindAll();
            this.contentPane = UI_main.createInstance();
        }
        addDiamondEvent() {
            UIMgr.instance.openUI("Charge");
        }
        signEvent() {
            UIMgr.instance.openUI("Sign");
        }
        mapEvent() {
            UIMgr.instance.openUI("MapWindow");
        }
        taskEvent() {
        }
        skillEvent() {
        }
        doubleEvent() {
        }
        equipEvent() {
        }
        marketEvent() {
        }
        makeEvent() {
        }
        notify_update_money() {
            let sc = (this.contentPane);
            let money = (sc.m_money);
            let gold = 1000;
            money.m_lab_money.text = gold.toString();
        }
    }

    class UI_map extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Map", "map"));
        }
        onConstruct() {
            this.m_btn_back = (this.getChild("btn_back"));
            this.m_map0 = (this.getChild("map0"));
            this.m_map1 = (this.getChild("map1"));
            this.m_map2 = (this.getChild("map2"));
            this.m_map3 = (this.getChild("map3"));
            this.m_map4 = (this.getChild("map4"));
            this.m_map5 = (this.getChild("map5"));
            this.m_map6 = (this.getChild("map6"));
            this.m_map7 = (this.getChild("map7"));
            this.m_t0 = this.getTransition("t0");
        }
    }
    UI_map.URL = "ui://2hpj09q8wvto7";

    class UI_map_item extends fgui.GComponent {
        static createInstance() {
            return (fgui.UIPackage.createObject("Map", "map_item"));
        }
        onConstruct() {
            this.m_star1 = (this.getChild("star1"));
            this.m_star2 = (this.getChild("star2"));
            this.m_star3 = (this.getChild("star3"));
            this.m_lab_pass = (this.getChild("lab_pass"));
        }
    }
    UI_map_item.URL = "ui://2hpj09q8wvto8";

    class MapBinder {
        static bindAll() {
            fgui.UIObjectFactory.setExtension(UI_map.URL, UI_map);
            fgui.UIObjectFactory.setExtension(UI_map_item.URL, UI_map_item);
        }
    }

    class MapWindow extends BaseWindow {
        constructor() {
            super();
            this.m_stars = [];
            this.pkg_name = "res/Map";
            this.win_name = "map";
        }
        onCreate() {
            let map = (this.contentPane);
            map.m_btn_back.onClick(this, this.backEvent);
        }
        createWin() {
            MapBinder.bindAll();
            this.contentPane = UI_map.createInstance();
        }
        backEvent() {
            this.hide();
        }
    }

    class GameUI {
        constructor() {
        }
        static init() {
            Laya.ClassUtils.regClass("Login", Login);
            Laya.ClassUtils.regClass("Charge", Charge);
            Laya.ClassUtils.regClass("MainScene", MainScene);
            Laya.ClassUtils.regClass("MapWindow", MapWindow);
        }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            fgui.UIConfig.modalLayerColor = "rgba(0,0,0,0.8)";
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onLoadRes));
        }
        onLoadRes() {
            let pkgs = ["res/Common"];
            fgui.UIPackage.loadPackage(pkgs, Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            let configs = ["snow.part"];
            Laya.loader.load(configs, Laya.Handler.create(this, this.startScene));
        }
        startScene() {
            GameUI.init();
            UIMgr.instance.openUI("Login", null, true);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
