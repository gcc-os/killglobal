// pages/page2/index.js
const app = getApp();
const _page = app.kgpage({
    /**
     * 页面的初始数据
     */
    data: {

    },
    onKGData(data, tag) {
        console.log("page2 ----- ");
        console.log(data, tag);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    bindBack() {
        app.kgrouter.back().withKGData({ back: 1 }, 'page2 back');
    },
    bindReLaunch() {
        app.kgrouter.reLaunch('/pages/index/index').withKGData({ reLaunch: 1 }, 'page2 relaunch');
    },
    bindRedirect() {
        app.kgrouter.redirect('/pages/index/index').withKGData({ redirect: 1 }, 'page2 redirect');
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
});
Page(_page);
