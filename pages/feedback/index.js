// pages/feedback/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true,
      },
      {
        id: 1,
        value: "商品·商家投诉",
        isActive: false,
      },
    ],
    chooseImgs: [],
  },
  hanleTabsItemChange(e) {
    // console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? (v.isActive = true) : (v.isActive = false);
    });
    this.setData({
      tabs,
    });
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      scorceType: ["album", "camera"],
      success: (result) => {
        this.setData({
          //    图片数组 进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths],
        });
      },
    });
  },
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs,
    });
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value,
    });
  },
  handleFormSubmit() {
    const { textVal } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: "输入不合法",
        icon: "none",
        mask: true,
      });
      return;
    }
  },
});
