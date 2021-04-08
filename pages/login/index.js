// pages/login/index.js
Page({
  handleGetuserInfo(e) {
    console.log(e);
    const { userInfo } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1,
    });
  },
});
