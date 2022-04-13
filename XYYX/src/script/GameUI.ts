
import Charge from "./Charge";
import Login from "./Login";
import MainScene from "./MainScene";
import MapWindow from "./MapWindow";

export default class GameUI{
    constructor(){

    }

    static init(){
        Laya.ClassUtils.regClass("Login",Login);
        Laya.ClassUtils.regClass("Charge",Charge);
        Laya.ClassUtils.regClass("MainScene",MainScene);
        Laya.ClassUtils.regClass("MapWindow",MapWindow);
    }
}