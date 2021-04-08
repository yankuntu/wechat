let ajaxTimes = 0;

// 使用ES6的Promise封装request函数，方便后期维护
export const request = (params) => {
  // 显示加载中  效果
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  ajaxTimes++;
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    // console.log(resolve.data);
    wx.request({
      ...params,
      url: baseUrl + params.url,

      success: (result) => {
        // console.log(params);
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          wx.hideLoading();
        }
      },
    });
  });
};
