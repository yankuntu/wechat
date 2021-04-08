import {
  getSetting,
  chooseAddress,
  openSetting,
  showModel,
  showToast,
} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
  },
  onShow() {
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter((v) => v.checked);
    this.setData({ address });

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
    wx.setStorageSync("cart", cart);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo;
      // console.log(res2);
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
});
