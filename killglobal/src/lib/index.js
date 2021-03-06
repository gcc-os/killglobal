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
    if (Object.keys(data).length == 0) {
        if (Array.isArray(data)) { // 如果是空数组，返回新的空数组对象
            return [];
        } else { // 如果是对象，返回空的对象
            return {};
        }
    }
    let _data = {};
    if (Array.isArray(data)) { // 如果是数组
        _data = [];
        if (data.length > 0) {
            for (let key = 0; key < data.length; key++) {
                let val = data[key];
                if (typeof val == 'object') {
                    _data[key] = KillGlobal_DeepCopy(val);
                    continue;
                }
                _data[key] = val;
            }
        }
    } else { // 如果是字典
        for (let key in data) {
            let val = data[key];
            if (typeof val == 'object') {
                _data[key] = KillGlobal_DeepCopy(val);
                continue;
            }
            _data[key] = val;
        }
    }
    return _data;
}

function KG_GetUniqueCode() { // 获取唯的编码
    return `_k_p_k_${parseInt(Math.random() * 1000000)}`;
}

function KG_SetDataPool(data, key, type = 'data') { // 将数据放入数据池
    const _key = key || KG_GetUniqueCode();
    if(!KG_DataPool[_key]){
        KG_DataPool[_key] = {data:'',onPage:''};
    }
    if(type == 'data'){
        KG_DataPool[_key]['data'] = data;
    }else if(type == 'onPage'){
        KG_DataPool[_key]['onPage'] = data;
    }
}

function KG_GetDataPool(key, type = 'data') { // 取数据
    if (!key || key == KG_NUL_VALUE) return {};
    const _res = KG_DataPool[key];
    if(!_res){ return ''; }
    if(type == 'data' && _res['data']){
        const _data = _res['data'];
        delete KG_DataPool[key]['data'];
        return _data;
    }else if(type == 'onPage' && _res['onPage']){
        const _data = _res['onPage'];
        delete KG_DataPool[key]['onPage'];
        return _data;
    }
    return '';
}

function CheckDataAble(data) {
    if (!data) {
        return false;
    }
    if (typeof data != 'object') {
        return false;
    }
    return true;
}

function KG_TranslateData(options_key, page = '', type) { // 传输数据的对象
    this.type = type;
    this.targetPage = page;
    this.translateCode = options_key || KG_NUL_VALUE;
    // *@param data: 数据
    // *@param tag: 标识 可选,一个page的onKGData可能会被很多page调用，这个tag用来标示数据来源
    this.withKGData = function (data, tag = '') { // 存储数据/传数据
        if (!CheckDataAble(data)) {
            console.error("withKGData(data): data need be an available Object!( data必须是一个可用的Object对象! )")
            return this;
        }
        let _data = KillGlobal_DeepCopy(data) // 拷贝data，防止互相干扰
        if (this.targetPage && this.targetPage.onKGData) {
            // 如果知道page，直接将数据传过去
            this.targetPage.onKGData(_data, tag || this.type);
            return this;
        }
        _data[KG_DATA_TAG] = tag;
        KG_SetDataPool(_data, this.translateCode);
        _data = null;
        return this;
    }
    // *@param callback(page): 回调
    this.onPage = function (callback) { // 监听onLoad
        if (typeof callback != 'function') {
            console.error("onPage(callback): callback need be an available function!( callback必须是一个可用的function! )")
            return this;
        }
        if (this.targetPage) {
            // 如果知道page
            callback(this.targetPage);
            return this;
        }
        KG_SetDataPool(callback, this.translateCode,"onPage");
    }
    this.release = ()=>{
        this.type = '';
        this.targetPage = null;
        this.translateCode = '';
        this.withKGData = null;
        this.onPage = null;
    }
}

const KG_InsertKeyToParams = function (params, type) { // 向params中插入参数
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


export default {
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
    KG_GetDataPool,
    KG_TranslateData,
    KG_InsertKeyToParams,
    KG_DefineReadOnlyProperty
}
