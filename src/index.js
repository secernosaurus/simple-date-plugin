class DatePlugin {
  constructor () {
    this.list = {};
    this.weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  }
  nucleus (today = new Date(), num = 0) {
    // 获取今天日期
    // let today = new Date();
    let len = num + 42;
    // 获取年月日，星期
    let y = today.getFullYear();
    let m = today.getMonth();
    // 获取当月第一天星期几currentFirstDayWeek => w
    let cw = new Date(y, m, 1).getDay();
    cw = cw == 0 ? 7 : cw;
    // 获取当月最后一天是几号currentDate => cd
    let cd = new Date(y, m + 1, 0).getDate();
    // 获取上个个月最后一天是几号prevDate => pd
    let pd = new Date(y, m, 0).getDate();
    // console.log(cw,cd,pd)
    let newArr = [];
    let dates = [];
    for (let i = num; i < len; i++) {
      let date = {}
      date.weak = i % 7;
      date.isShow = false;
      if (i >= cw && i <= cd + cw - 1) {
        date.date = new Date(y, m, 1 + i - cw).toLocaleDateString().split('\/').join('-');
        date.day = new Date(y, m, 1 + i - cw).getDate();
        date.isShow = true
      }
      else if (i < cw) {
        date.date = new Date(y, m - 1, pd - (cw - i - 1)).toLocaleDateString().split('\/').join('-');
        date.day = new Date(y, m - 1, pd - (cw - i - 1)).getDate();
      }
      else {
        date.date = new Date(y, m + 1, i - (cd + cw - 1)).toLocaleDateString().split('\/').join('-');
        date.day = new Date(y, m + 1, i - (cd + cw - 1)).getDate()
      }
      dates.push(date)
      if (i % 7 === (num+6) % 7) { // i = 6;
        newArr.push(dates);
        dates = [];
      }
    }
    // console.log(newArr);
    // return newArr;
    let doc = document.createDocumentFragment();
    // 修改日期对应顺序
    // console.log(num,this.weekArr);
    if (num === 1 && this.weekArr[0] === '周日') {
      this.weekArr = this.weekArr.slice(num).concat(this.weekArr.slice(0, num));
    }
    else if (num === 0 && this.weekArr[0] === '周一') {
      this.weekArr = this.weekArr.slice(6).concat(this.weekArr.slice(num, 6));
    }
    // 添加星期几
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'week');
    for (let i = 0; i < this.weekArr.length; i++) {
      let li = document.createElement('li');
      li.innerText = this.weekArr[i];
      ul.appendChild(li);
    }
    doc.appendChild(ul);
    // 添加日历
    let calendar = document.createElement('div');
    // let div = document.createElement('div');
    calendar.setAttribute('id', 'calendar');
    for (let i = 0; i < newArr.length; i++) {
      let ul = document.createElement('ul');
      for (let j = 0; j < newArr[i].length; j ++) {
        let li = document.createElement('li');
        li.innerText = newArr[i][j].day;
        li.setAttribute('class', newArr[i][j].isShow === false ? 'bgcolor' : '') ;
        ul.appendChild(li);
      }
      calendar.appendChild(ul);
    }
    doc.appendChild(calendar);
    return doc;
  }
  setHeader () {
    let doc = document.createDocumentFragment();
    // 添加控制头
    let header = document.createElement('div');
    header.setAttribute('id', 'header');
    let prev = document.createElement('a');
    prev.setAttribute('class', 'prev');
    prev.innerText = '< 上';
    let next = document.createElement('a');
    next.setAttribute('class', 'next');
    next.innerText = '下 >';
    header.appendChild(prev);
    header.appendChild(next);
    doc.appendChild(header);
    return doc;
  }
  set (today = new Date(), num = 0) {
    // today为当前日期，可以从后台获取，也可获取当前时间
    today = today ? new Date(today) : new Date();
    // 判断num是不是在0~6之间
    if (num > 1 || num < 0) {
      return 'num取值必须是0/1';
    }
    this.list['today'] = today;
    this.list['num'] = num;
    let dateList = this.nucleus(today, num);
    let doc = document.createDocumentFragment();
    // 添加控制头
    let docHeader = this.setHeader();
    doc.appendChild(docHeader);
    // 添加星期和日历
    doc.appendChild(dateList);
    return doc;
  }
}

window.DatePlugin = DatePlugin
