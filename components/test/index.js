let dotsTimer = null;
const app = getApp();
Component({
    properties: {
        styleType: {
            type: String,
            value: '',
        },
    },
    data: {
        isShow: false,
    },
    ready() {
    },
    detached() {

    },
    methods: {
        bindClick() {
            app.kgrouter.push("/pages/page2/index").withKGData('sss');
        },
    },
});
