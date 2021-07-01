// pages/page1/index.js
const app = getApp();
const _page = app.kgpage({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onKGData(data, tag) {
        console.log("page1 ----- ");
        console.log(data, tag);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("app.kgrouter.currentPage",app.kgrouter.topPage);
        console.log("app.kgrouter.currentPage",app.kgrouter.lastPage);
        console.log("app.kgrouter.currentPage",app.kgrouter.currentPage);
    },
    showAlert(){
        console.log("page1 fn showAlert----");
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
Page(_page)
