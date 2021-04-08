// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [], //设置index的默认值，如果父组件中没有传递这个属性的值，则调用默认值
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 组件绑定的函数在这里书写
    handleItemTap(e) {
      // console.log(e);
      const { index } = e.currentTarget.dataset;
      // 触发 父组件中的事件 自定义
      this.triggerEvent("tabsItemChange", { index });
    },
  },
});
