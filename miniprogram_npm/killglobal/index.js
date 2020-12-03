module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1601346375484, function(require, module, exports) {
var __TEMP__ = require('./src/wx/index');var KGWX = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./src/notificationCenter/index');var KGNotificationCenter = __REQUIRE_DEFAULT__(__TEMP__);
let _wx = null;

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.getKGWechat = function getKGWechat() {
    if (!_wx) {
        _wx = {};
        _wx.page = KGWX.page;
        _wx.router = KGWX.router.shareInstace();
        _wx.notificationCenter = KGNotificationCenter;
    }
    return _wx;
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.getKGVue = function getKGVue() {
    if (!_wx) {
        _wx = {};
        _wx.page = KGWX.page;
        _wx.router = KGWX.router.shareInstace();
        _wx.notificationCenter = KGNotificationCenter;
    }
    return _wx;
};

}, function(modId) {var map = {"./src/wx/index":1601346375485,"./src/notificationCenter/index":1601346375489}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1601346375485, function(require, module, exports) {
// Richie Guo 2020-09-16

var __TEMP__ = require('./page');var KGPage = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./router');var KGRouter = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
    page: KGPage,
    router: KGRouter,
};

}, function(modId) { var map = {"./page":1601346375486,"./router":1601346375487}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1601346375486, function(require, module, exports) {
// Richie Guo 2020-09-16

var __TEMP__ = require('./router');var WX_KGRouter = __REQUIRE_DEFAULT__(__TEMP__);
const KGRouter = WX_KGRouter.shareInstace();

const KGPage = function(JSON) {
    const _onLoad = JSON.onLoad;
    JSON.onLoad = function(options) {
        if (!options[KGRouter.optionsKey] || options[KGRouter.optionsKey] === KGRouter.optionsNull) {
            this[KGRouter.optionsKey] = KGRouter.getUniqueCode();
        } else {
            this[KGRouter.optionsKey] = options[KGRouter.optionsKey];
            delete options[KGRouter.optionsKey];
            if (options[KGRouter.optionsTypeKey]) {
                this[KGRouter.optionsTypeKey] = options[KGRouter.optionsTypeKey] || '';
                delete options[KGRouter.optionsTypeKey];
            }
        }
        if (this.onKGData) {
            const _kg_data = KGRouter.getDataFromPool(this[KGRouter.optionsKey]);
            if (_kg_data) {
                const _tag = _kg_data[KGRouter.dataTag] || this[KGRouter.optionsTypeKey]
                delete _kg_data[KGRouter.dataTag];
                this.onKGData(_kg_data, _tag);
            }
            if (this[KGRouter.optionsTypeKey]) {
                delete this[KGRouter.optionsTypeKey];
            }
        }
        _onLoad && _onLoad.call(this, options);
    }
    return JSON;
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = KGPage;

}, function(modId) { var map = {"./router":1601346375487}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1601346375487, function(require, module, exports) {
// Richie Guo 2020-09-16
// 编码参数格式 {a:1,b:2,c:3} => ?a=1&b=2&c=3 用于url传参

var __TEMP__ = require('../lib/index');var LIB = __REQUIRE_DEFAULT__(__TEMP__);
const {
    KillGlobal_EncodeParams,
    KG_GetUniqueCode,
    KG_TYPE_BACK, // 返回
    KG_TYPE_NAVIGATETO, // push
    KG_TYPE_RELAUNCH, // 重启
    KG_TYPE_REDIRECT, // 重定向
    KG_DATA_TAG, // options中的标示，用来获取key
    KG_OPTIONS_KEY, // options中的标示，用来获取key
    KG_OPTIONS_TYPE_KEY, // options中的标示，用来获取key
    KG_NUL_VALUE, //options表示空的标示
    KG_DataPool, // 数据池
    KG_TranslateData,
    KG_InsertKeyToParams,
    KG_DefineReadOnlyProperty,
} = LIB;
let _share_wx_router = null;

function _WX_KGRouter() {
    const _property = {
        navigateTo(url, params) { // 进入下一个页面  url：地址, params：参数
            const _params = KG_InsertKeyToParams(params, KG_TYPE_NAVIGATETO);
            wx.navigateTo({ url: `${url}${KillGlobal_EncodeParams(_params, url)}` });
            return new KG_TranslateData(_params[KG_OPTIONS_KEY]);
        },
        redirectTo(url, params) { // 重定向  url：地址, params：参数
            const _params = KG_InsertKeyToParams(params, KG_TYPE_REDIRECT);
            wx.redirectTo({ url: `${url}${KillGlobal_EncodeParams(_params, url)}` });
            return new KG_TranslateData(_params[KG_OPTIONS_KEY]);
        },
        reLaunch(url, params) { // 重启到某个页面 url：地址, params：参数
            const _params = KG_InsertKeyToParams(params, KG_TYPE_RELAUNCH);
            wx.reLaunch({ url: `${url}${KillGlobal_EncodeParams(_params, url)}` });
            return new KG_TranslateData(_params[KG_OPTIONS_KEY]);
        },
        navigateBack(delta = 1) { // 返回某个页面
            const _pages = getCurrentPages();
            let _ind = _pages.length - delta - 1;
            _ind = _ind > -1 ? _ind : 0;
            _ind = _ind > _pages.length - 1 ? _pages.length - 1 : _ind;
            const _page = _pages[_ind]; // 目地页面
            const _key = _page[KG_OPTIONS_KEY]; // 目地页面的key
            wx.navigateBack({ delta });
            return new KG_TranslateData(_key, _page, KG_TYPE_BACK);
        },
        getDataFromPool(key) { // 获取数据
            if (!key || key === KG_NUL_VALUE) return '';
            const _data = KG_DataPool[key];
            delete KG_DataPool[key]; // 从数据池删除数据
            return _data;
        },
        get optionsKey() {
            return KG_OPTIONS_KEY;
        },
        get optionsTypeKey() {
            return KG_OPTIONS_TYPE_KEY;
        },
        get optionsNull() {
            return KG_NUL_VALUE;
        },
        get dataTag() {
            return KG_DATA_TAG;
        },
        get getUniqueCode() {
            return KG_GetUniqueCode;
        },
        get encodeUrlParams() { // 将参数编码为字符串
            return KillGlobal_EncodeParams
        },
        get push() { // navigateTo别名1
            return this.navigateTo;
        },
        get goto() { // navigateTo别名2
            return this.navigateTo;
        },
        get redirect() { // 重定向 别名
            return this.redirectTo;
        },
        get back() { // 返回 别名
            return this.navigateBack;
        },
    };
    this.init = function() {
        KG_DefineReadOnlyProperty(this, _property);
        return this;
    }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
    shareInstace() {
        if (!_share_wx_router) {
            _share_wx_router = (new _WX_KGRouter()).init();
        }
        return _share_wx_router;
    }
};

}, function(modId) { var map = {"../lib/index":1601346375488}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1601346375488, function(require, module, exports) {
const KG_TYPE_BACK = "KG_NAVIGATEBACK"; // 返回
const KG_TYPE_NAVIGATETO = "KG_NAVIGATETO"; // push
const KG_TYPE_RELAUNCH = "KG_RELAUNCH"; // 重启
const KG_TYPE_REDIRECT = "KG_REDIRECTTO"; // 重定向
const KG_DATA_TAG = '_kill_global_data_tag_'; // options中的标示，用来获取key
const KG_OPTIONS_KEY = '_kill_global_data_pool_key_'; // options中的标示，用来获取key
const KG_OPTIONS_TYPE_KEY = '_kill_global_type_'; // options中的标示，用来获取key
const KG_NUL_VALUE = '_kill_global_data_pool_key_null'; //options表示空的标示
const KG_DataPool = {}; // 数据池

function KillGlobal_EncodeParams(params, url) { // *url可选，非必传
    let _params = '';
    if (params && typeof params == 'object') {
        let keys = Object.keys(params);
        for (let i = 0; i < keys.length; i++) {
            let _key = keys[i];
            if (i == 0) {
                if (url && url.indexOf('?') > -1) {
                    _params += `&${_key}=${params[_key]}`;
                } else {
                    _params += `?${_key}=${params[_key]}`;
                }
            } else {
                _params += `&${_key}=${params[_key]}`;
            }
        }
    }
    return _params;
}

function KillGlobal_DeepCopy(data) { // *对象深拷贝
    if (!data) return '';
    if (typeof data != 'object') return data;
    if (Object.keys(data).length == 0) return data;
    let _data = {};
    if (Array.isArray(data)) { // 如果是数组
        _data = [];
        if (data.length > 0) {
            for (let key = 0; key < data.length; key++) {
                let val = data[key];
                if (typeof val == 'object') {
                    _data[key] = DeepCopy(val);
                    continue;
                }
                _data[key] = val;
            }
        }
    } else { // 如果是字典
        for (let key in data) {
            let val = data[key];
            if (typeof val == 'object') {
                _data[key] = DeepCopy(val);
                continue;
            }
            _data[key] = val;
        }
    }
    return _data;
}

function KG_GetUniqueCode() { // 获取唯的编码
    return `_data_pool_key_${parseInt(Math.random()*1000000)}`;
}

function KG_SetDataPool(data, key) { // 将数据放入数据池
    if (!data) return KG_NUL_VALUE;
    let _key = key || KG_GetUniqueCode();
    KG_DataPool[_key] = data;
    const _options = {};
    _options[KG_OPTIONS_KEY] = _key;
    return _options;
}

function KG_TranslateData(options_key, page = '', type) { // 传输数据的对象
    this.type = type;
    this.targetPage = page;
    this.translateCode = options_key || KG_NUL_VALUE;
    // *@param data: 数据
    // *@param tag: 标识 可选,一个page的onKGData可能会被很多page调用，这个tag用来标示数据来源
    this.withKGData = function(data, tag = '') { // 存储数据/传数据
        const _data = KillGlobal_DeepCopy(data) // 拷贝data，防止互相干扰
        if (this.targetPage && this.targetPage.onKGData) {
            // 如果知道page，直接将数据传过去
            this.targetPage.onKGData(_data, tag || this.type);
            return;
        }
        _data[KG_DATA_TAG] = tag;
        KG_SetDataPool(_data, this.translateCode);
    }
}

const KG_InsertKeyToParams = function(params, type) { // 向params中插入参数
    let _params = {};
    if (params && Object.keys(params).length > 0) {
        _params = Object.assign(_params, params);
    }
    _params[KG_OPTIONS_KEY] = KG_GetUniqueCode();
    _params[KG_OPTIONS_TYPE_KEY] = type;
    return _params;
}


// 将property的所有字段赋给obj，并设置为只读
function KG_DefineReadOnlyProperty(obj, prototype) {
    if (!prototype || typeof prototype != 'object') return obj;
    for (let key in prototype) {
        try {
            // total_buy_price_formate
            // 允许覆盖属性
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                delete obj[key];
            }
            Object.defineProperty(obj, key, {
                get() { return prototype[key]; }, // 设置属性只读
                enumerable: true, // 允许遍历
                configurable: true, // 允许删除
            });
        } catch (err) {
            console.error(err);
            console.trace();
        }
    }
    return obj;
}


if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
    KG_DefineReadOnlyProperty,
    KillGlobal_EncodeParams,
    KillGlobal_DeepCopy,
    KG_GetUniqueCode,
    KG_TYPE_BACK, // 返回
    KG_TYPE_NAVIGATETO, // push
    KG_TYPE_RELAUNCH, // 重启
    KG_TYPE_REDIRECT, // 重定向
    KG_DATA_TAG, // options中的标示，用来获取key
    KG_OPTIONS_KEY, // options中的标示，用来获取key
    KG_OPTIONS_TYPE_KEY, // options中的标示，用来获取key
    KG_NUL_VALUE, //options表示空的标示
    KG_DataPool, // 数据池
    KG_SetDataPool,
    KG_TranslateData,
    KG_InsertKeyToParams,
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1601346375489, function(require, module, exports) {
// Richie Guo 2020-09-16
// 通知
const NotificationCenter = function() {

}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = NotificationCenter;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1601346375484);
})()
//# sourceMappingURL=index.js.map