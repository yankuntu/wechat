import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inpValue: "",
  },
  TimedId: -1,
  handleInput(e) {
    const { value } = e.detail;
    //     检验是否是空数据
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false,
      });
      return;
    }
    this.setData({
      isFocus: true,
    });
    //     准备发送请求获取数据
    clearTimeout(this.TimedId);
    this.TimedId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    console.log(res);
    this.setData({
      goods: res,
    });
  },
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: [],
    });
  },
});
