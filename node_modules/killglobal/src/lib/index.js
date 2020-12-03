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


export default {
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
}
