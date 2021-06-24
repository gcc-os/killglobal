// Richie Guo 2020-09-16

import WX_KGRouter from './router';
const KGRouter = WX_KGRouter.shareInstace();

const KGPage = function(JSON) {
    const _onLoad = JSON.onLoad;
    JSON.onLoad = function(options) {
        // 清除options的无用数据
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
        // 是否有数据
        if (this.onKGData) {
            let _kg_data = KGRouter.getDataFromPool(this[KGRouter.optionsKey]);
            if (_kg_data) {
                const _tag = _kg_data[KGRouter.dataTag] || this[KGRouter.optionsTypeKey]
                delete _kg_data[KGRouter.dataTag];
                this.onKGData(_kg_data, _tag);
                _kg_data = null;
            }
            if (this[KGRouter.optionsTypeKey]) {
                delete this[KGRouter.optionsTypeKey];
            }
        }
        // onPageReady监听
        let _kg_onPageReady = KGRouter.getDataFromPool(this[KGRouter.optionsKey],'onPageReady');
        if (_kg_onPageReady) {
            _kg_onPageReady(this);
            _kg_onPageReady = null;
        }
        _onLoad && _onLoad.call(this, options);
    }
    return JSON;
}
export default KGPage;
