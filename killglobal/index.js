import KGWX from "./src/wx/index";
import KGNotificationCenter from "./src/notificationCenter/index";
let _wx = null;

export function getKGWechat() {
    if (!_wx) {
        _wx = {};
        _wx.page = KGWX.page;
        _wx.router = KGWX.router.shareInstace();
        _wx.notificationCenter = KGNotificationCenter;
    }
    return _wx;
}

export const getWechat = getKGWechat;

export function getKGVue() {
    if (!_wx) {
        _wx = {};
        _wx.page = KGWX.page;
        _wx.router = KGWX.router.shareInstace();
        _wx.notificationCenter = KGNotificationCenter;
    }
    return _wx;
}
