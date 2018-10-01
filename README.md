# simple-date-plugin

## 简介
简单的日期插件，扩展性强

- [官网](https://secernosaurus.github.io/)

## 文档
- [如何使用](./doc/use/README.md)
- [二次开发](./doc/dev/README.md)

## 安装下载

- 下载地址 https://github.com/secernosaurus/simple-date-plugin/releases
- `npm i simple-date-plugin`
- CDN http://unpkg.com/simple-date-plugin/release/bundle.js

## 快速使用

```js
- 获取日历的输入框
<div id="inputValue" class="input-value">
  <input type="text" placeholder="请选择日期" />
</div>
- 在页面上有个日历显示框，默认隐藏
<div id="list" class="hidden">
</div>
- 实例化组件
let calendar = new DatePlugin();
- 初始化
let doc = calendar.init();
- 获取页面日历显示框
let itemInner = document.getElementById("list");
- 将日历添加到日历显示框中
itemInner.appendChild(doc);
```

## 交流 & 提问

- 提问：https://github.com/secernosaurus/simple-date-plugin/issues
- QQ群：

## 关于
