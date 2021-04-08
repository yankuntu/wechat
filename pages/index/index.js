import { request } from "../../request/index.js";
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    categroyList: [],
    floorList: [],
  },

  //options(Object)
  onLoad: function (options) {
    // wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success: (result) => {
    //     console.log(result);

    //     this.setData({
    //       swiperList: result.data.message,
    //     });
    //   },
    // });
    // 使用自己封装的request

    this.getSwiperList();
    this.getCategoryList();
    this.getFloorList();
  },
  // 获取 轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperList: result,
      });
    });
  },
  // 获取 分类导航数据
  getCategoryList() {
    request({
      url: "/home/catitems",
    }).then((result) => {
      this.setData({
        categroyList: result,
      });
    });
  },
  // 获取 分类导航数据
  getFloorList() {
    request({
      url: "/home/floordata",
    }).then((result) => {
      console.log(result);
      this.setData({
        floorList: result,
      });
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
