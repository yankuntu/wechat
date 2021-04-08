import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false,
  },

  // 定义全局数据
  GoodsInfo: [],
  /**
   * 生命周期函数--监听页面加载
   */
  // 注意：onShow函数取不到options

  onShow: function () {
    // 注意：onShow函数取不到options
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDtail(goods_id);
  },

  // 获取商品详情数据
  async getGoodsDtail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: { goods_id },
    });
    this.GoodsInfo = goodsObj;
    // 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前商品是否被收藏
    let isCollect = collect.some((v) => v.goods_id === this.GoodsInfo.goods_id);
    //     console.log(res);
    this.setData({
      // 准确存入有效数据
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
        pics: goodsObj.pics,
      },
      isCollect,
    });
  },
  handlePreviewImage(e) {
    console.log(e);
    const urls = this.GoodsInfo.pics.map((v) => v.pics_mid);
    const current = e.currentTarget.dataset.url;

    wx.previewImage({
      current,
      urls,
    });
  },

  // 收藏操作
  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(
      (v) => v.goods_id === this.GoodsInfo.goods_id
    );
    // 当index!=-1表示 已经收藏过
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: "取消成功",
        icon: "success",
        mask: true,
      });
    } else {
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        mask: true,
      });
    }
    // 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 修改data中收藏的信息
    this.setData({
      isCollect,
    });
  },

  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex((v) => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }

    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "加入成功",
      icon: "success",
      mask: true,
    });
  },
});
