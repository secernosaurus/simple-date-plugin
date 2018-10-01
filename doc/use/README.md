# 使用文档

## 初始化

```js
// 实例化
let calendar = new DatePlugin();
// 初始化
let doc = calendar.init();
```

## 使用和修改

```js
- 修改日历点击事件，添加标记、日程...，可以在src/index.js中找到init下的calendar的click事件
calendar.addEventListener('click',(e) => {....});
- 修改上月、下月，上年、下年的事件，可以在src/index.js中找到setHeader下的prevM,prevY,nextM,nextY的click事件
// PC端点击事件，月减减，月加加
prevM.addEventListener('click', (e) => {
  e.preventDefault();
  // 减减
  this.plusMinus('-');
})
nextM.addEventListener('click', (e) => {
  e.preventDefault();
  // 加加
  this.plusMinus('+');
})
// 点击事件，年减减，年加加
prevY.addEventListener('click', (e) => {
  e.preventDefault();
  // 减减
  this.plusMinus('--');
})
nextY.addEventListener('click', (e) => {
  e.preventDefault();
  // 加加
  this.plusMinus('++');
})
- 修改取消/确定按钮的click事件，可以在src/index.js中找到setTopBtn中的click事件
cancel.addEventListener('click', (e) => {
  e.preventDefault();
  this.updateClass();
})
determine.addEventListener('click', (e) => {
  e.preventDefault();
  this.updateClass();
})
- 修改inputValue的click事件，可以在src/index.js中找到init中的inputId的click事件
inputId.addEventListener('click', (e) => {....});
```
