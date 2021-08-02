//index.js
//获取应用实例
const app = getApp()
const _page = app.kgpage({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onKGData(data, tag) {
        console.log("page page page ----- ");
        console.log(data, tag);
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    createImg(){
        const query = wx.createSelectorQuery()
        query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        this.getImage(ctx);
        // const dpr = wx.getSystemInfoSync().pixelRatio
        // canvas.width = res[0].width * dpr
        // canvas.height = res[0].height * dpr
        // ctx.scale(dpr, dpr)
        // ctx.fillRect(0, 0, 100, 100)

      })
    },
    getImage(ctx){
        const url = 'https://static-cdn.verystar.net/e/hyatt/book/park_hyatt_logo.svg';
        wx.getImageInfo({
            src: url,
            success: function (res) {
                console.log(res);
                this.executeDraw(ctx, res.path)
            },
            fail(err){
                console.log(err);
            }
        })
    },
    executeDraw(ctx,photo){
        // const photo = 'https://static-cdn.verystar.net/e/hyatt/book/park_hyatt_logo.svg';
        // wx.getImageInfo({
        //     src: photo,
        //     success: function (res) {
                
        //     },
        //     fail(err){
        //         console.log("err = ",err);
        //     },
        // })
        const _this = this;
        const res = {
            height: 100,
            width: 100
        }
        // console.log(res.height)
        // console.log(res.width)
        var towidth = 344;           //按宽度344px的比例压缩
        var toheight = Math.trunc(344*res.height/res.width);        //根据图片比例换算出图片高度
        _this.setData({
        canvas_h: toheight
        })
        ctx.drawImage(photo, 0, 0, res.width, res.height, 0, 0, towidth, toheight)
        ctx.draw(false, function () {
        wx.canvasToTempFilePath({
            canvasId: 'photo_canvas',
            fileType:"jpg",
            success: function (res) {
                console.log("res.tempFilePath ============= ");
                console.log(res.tempFilePath);
            },
            fail(err){
                console.log("res.tempFilePath ============= ",err);
            }
        }, this)
        })
    },
    bindPage1() {
        app.kgrouter.push('/pages/page1/index/index').withKGData({ a: 1, b: 2 }, 'page').onPage(page=>{
            page.showAlert();
        });
    },
    bindPage2() {
        app.kgrouter.push('/pages/page2/index').withKGData({ a: 21, b: 22 }, 'page');
    },
    doback(){
        console.log("--doback");
    },
    doreLaunch(){
        console.log("--doreLaunch");
    },
    doRedirect(){
        console.log("--doRedirect");
    },
    onLoad: function() {
        this.createImg();
        // console.log("app.kgrouter.currentPage",app.kgrouter.currentPage);
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
});
Page(_page)
