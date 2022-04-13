export default class EventMgr extends Laya.EventDispatcher {
    private static _instance: EventMgr = null;
    constructor() {
        super();
    }

    static get instance(): EventMgr {
        if (this._instance == null) {
            this._instance = new EventMgr();
        }
        return this._instance;
    }
}