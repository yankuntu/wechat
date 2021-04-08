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
    allChecked: false,
  },
  onShow() {
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    this.setCart(cart);
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

  handleItemChange(e) {
    // console.log("我不想购买了");
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex((v) => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setData({
      cart,
    });
    wx.setStorageSync("cart", cart);
    this.setCart(cart);
  },
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked;
    cart.forEach((v) => (v.checked = allChecked));
    this.setCart(cart);
  },
  async handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex((v) => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModel({ content: "您是否要删除？" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  setCart(cart) {
    // every 数组方法 会遍历并接收一个回调函数 只要每个回调函数都返回true 那么every方法的返回值也是true
    // 只要有一个回调函数返回了false 那么就不再循环执行，直接返回false
    // 多次使用循环 浪费内存和性能
    // const allChecked = cart.length ? cart.every((v) => v.checked) : false;
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
    });
    wx.setStorageSync("cart", cart);
  },

  async handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址" });
      return;
    }
    if (totalNum === 0) {
      await showToast({ title: "您还没有选择收货地址" });
      return;
    }

    wx.navigateTo({
      url: "/pages/pay/index",
    });
  },
});
