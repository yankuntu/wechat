import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    allList: [],
    currentIndex: 0,
    scollTop: 0,
  },
  // Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
    } else if (Date.now() - Cates.time > 1000 * 10) {
      this.getCates();
    } else {
      // 可以使用旧数据
      console.log("可以使用旧数据");
      this.allList = Cates.data;
      let leftList = this.allList.map((v) => v.cat_name);
      let rightList = this.allList[0].children;
      this.setData({
        leftList,
        rightList,
      });
    }
  },
  async getCates() {
    // request({
    //   url: "/categories",
    // }).then((result) => {
    //   //  console.log(result);
    //   this.allList = result.data.message;

    //   wx.setStorageSync("cates", { time: Date.now(), data: this.allList });

    //   console.log(this.allList);
    //   let leftList = this.allList.map((v) => v.cat_name);
    //   let rightList = this.allList[0].children;
    //   this.setData({
    //     leftList,
    //     rightList,
    //   });
    // });
    // 使用es7的async await来发送请求
    const res = await request({ url: "/categories" });
    this.allList = res;
    wx.setStorageSync("cates", { time: Date.now(), data: this.allList });

    console.log(this.allList);
    let leftList = this.allList.map((v) => v.cat_name);
    let rightList = this.allList[0].children;
    this.setData({
      leftList,
      rightList,
    });
  },
  handleItemTap(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    let rightList = this.allList[index].children;
    // 重新设置 右侧内容的scoll-view标签离顶部的距离
    this.setData({
      currentIndex: index,
      rightList,
      scrollTop: 0,
    });
  },
});
