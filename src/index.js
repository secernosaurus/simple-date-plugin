class DatePlugin {
  constructor () {
    this.list = {};
    this.dateList = [];
    // this.weekArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    this.weekArr = ['一', '二', '三', '四', '五', '六', '日'];
  }
  heart (today = new Date()) {
    // 获取今天日期
    // let today = new Date();
    // 获取年月日，星期
    let y = today.getFullYear();
    let m = today.getMonth();
    // 判断切换的月份与当前月份是否相同，相同则添加样式
    let curYear = this.list['currentDate'].getFullYear();
    let curMonth = this.list['currentDate'].getMonth();
    let curDay = this.list['currentDate'].getDate();
    // console.log(d);
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
    for (let i = 1; i < 43; i++) {
      let date = {}
      date.weak = i % 7;
      date.isShow = false;
      if (i >= cw && i <= cd + cw - 1) {
        date.date = new Date(y, m, 1 + i - cw).toLocaleDateString().split('\/').join('-');
        date.day = new Date(y, m, 1 + i - cw).getDate();
        date.isShow = true;
        // 判断当前日期时几号，如果与i相同则添加背景类
        if (y === curYear && m === curMonth && date.day === curDay) {
          date.dateBg = 'sel-color';
        }
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
      if (i % 7 === 0) { // i = 6;
        newArr.push(dates);
        dates = [];
      }
    }
    this.dateList = newArr;
    return newArr;
    // console.log(newArr);
  }
  setTopBtn () {
    let doc = document.createDocumentFragment();
    let div = document.createElement('div');
    div.setAttribute('id', 'top');
    div.setAttribute('class', 'top-btn');
    let cancel = document.createElement('a');
    cancel.setAttribute('class', 'cancel');
    cancel.innerText = '取消';
    let determine = document.createElement('a');
    determine.setAttribute('class', 'determine');
    determine.innerText = '确定';
    // 将按钮添加到div中
    div.appendChild(cancel);
    div.appendChild(determine);
    // 将div添加到文档片段中
    doc.appendChild(div);

    cancel.addEventListener('click', (e) => {
      e.preventDefault();
      this.updateClass();
    })
    determine.addEventListener('click', (e) => {
      e.preventDefault();
      this.updateClass();
    })
    return doc;
  }
  setHeader (today) {
    let doc = document.createDocumentFragment();
    // 获取日历id
    let y = today.getFullYear();
		let m = today.getMonth();
    let d = today.getDate();

    // this.e2c(y,m,d);
    // 添加控制头
    let header = document.createElement('div');
    header.setAttribute('id', 'header');
    let prevM = document.createElement('a');
    prevM.setAttribute('class', 'prev-m');
    prevM.innerText = '<';
    let prevY = document.createElement('a');
    prevY.setAttribute('class', 'prev-y');
    prevY.innerText = '<<';
    let nextM = document.createElement('a');
    nextM.setAttribute('class', 'next-m');
    nextM.innerText = '>';
    let nextY = document.createElement('a');
    nextY.setAttribute('class', 'next-y');
    nextY.innerText = '>>';
    let span = document.createElement('span');
    span.setAttribute('class', 'current-date');
    // span.innerText = [y, this.zeroPad(m + 1), this.zeroPad(d)].join('-');
    span.innerText = [y, this.zeroPad(m + 1)].join('-');
    header.appendChild(prevY);
    header.appendChild(prevM);
    header.appendChild(span);
    header.appendChild(nextM);
    header.appendChild(nextY);

    doc.appendChild(header);
    // 判断当前处于什么端，移动/pc
    let mobile = /Android|webOS|iPhone|iPod|BlackBerry/i;
    if (mobile.test(navigator.userAgent)) {
      header.removeChild(prevM);
      header.removeChild(nextM);
      header.setAttribute('class', 'center');
      // return doc;
    }
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
    // PC端点击事件，年减减，年加加
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
    return doc;
  }
  setWeek () {
    // 添加星期几
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'week');
    for (let i = 0; i < this.weekArr.length; i++) {
      let li = document.createElement('li');
      li.innerText = this.weekArr[i];
      ul.appendChild(li);
    }
    return ul;
  }
  setCalendar (today) {
    let doc = document.createDocumentFragment();
    // 添加日历
    let newArr = this.heart(today);
    // let div = document.createElement('div');
    let cal = document.createElement('div');
    cal.setAttribute('class', 'calendar');
    for (let i = 0; i < newArr.length; i++) {
      let ul = document.createElement('ul');
      for (let j = 0; j < newArr[i].length; j ++) {
        let li = document.createElement('li');
        // li.innerText = newArr[i][j].day;
        // li.setAttribute('class', newArr[i][j].isShow === false ? 'bgcolor' : newArr[i][j].dateBg);
        let span = document.createElement('span');
        span.innerText = newArr[i][j].day;
        // ul.appendChild(li);
        if (newArr[i][j].isShow === false) {
          span.setAttribute('class', 'bgcolor');
        }
        else {
          if (newArr[i][j].dateBg) {
            span.setAttribute('class', newArr[i][j].dateBg);
          }
        }
        li.appendChild(span);
        ul.appendChild(li);
      }
      cal.appendChild(ul);
    }
    // calendar.appendChild(cal);
    doc.appendChild(cal);
    // console.log(doc);
    return doc;
  }
  init (today = new Date()) {
    // today为当前日期，可以从后台获取，也可获取当前时间
    today = today ? new Date(today) : new Date();
    // 将第一次得到日期保存在变量中
    this.list['currentDate'] = today;
    let y = today.getFullYear();
    let m = today.getMonth();
    let d = today.getDate();
    // 日历初始化
    let inputId = document.querySelector('#inputValue input');
    // inputId.setAttribute('value',[y, this.zeroPad(m+1), this.zeroPad(d)].join('-'));
    // // 判断num是不是在0~6之间
    // if (num > 1 || num < 0) {
    //   return 'num取值必须是0/1';
    // }
    let doc = document.createDocumentFragment();
    // 添加top-btn
    let topBtn = this.setTopBtn();
    doc.appendChild(topBtn);
    // 添加控制头
    let docHeader = this.setHeader(today);
    doc.appendChild(docHeader);
    // 添加星期几
    let docWeek = this.setWeek();
    doc.appendChild(docWeek);
    // 添加日历
    let dateList = this.setCalendar(today);
    let calendar = document.createElement('div');
    calendar.setAttribute('id', 'calendar');
    calendar.appendChild(dateList);
    doc.appendChild(calendar);

    // 滑动改变日期
    let startx,starty,endx,endy;
    //手指接触屏幕
		calendar.addEventListener("touchstart", (e) => {
      startx = e.touches[0].pageX || e.targetTouches[0].pageX;
      starty = e.touches[0].pageY || e.targetTouches[0].pageY;
    }, false);
    //手指离开屏幕
    // let _this = this;
    calendar.addEventListener("touchend", (e) => {
      // calendarCl = document.querySelector('.calendar');
      // let endx, endy;
      endx = e.changedTouches[0].pageX || e.targetTouches[0].pageX;
      endy = e.changedTouches[0].pageY || e.targetTouches[0].pageY;
      let direction = this.getDirection(startx, starty, endx, endy);

      switch (direction) {
          case 3:
              // 向左
              this.plusMinus('+');
              break;
          case 4:
              // 向右
              this.plusMinus('-');
              break;
          default:
      }
    }, false);

    // 日期点击事件
    calendar.addEventListener('click',(e) => {
      e.preventDefault();
      // 获取显示的日期
      let cur = document.querySelector('.current-date');
      let currDate = new Date(cur.innerText);
      let y = currDate.getFullYear();
      let m = currDate.getMonth();
      // 获取已选中的日期
      let selectDate = document.querySelector('.sel-color');
      // 判断点击的是否为span元素
      if (e.target.nodeName === 'LI' && e.target.querySelector('span').className !== 'bgcolor') {
        // 获取当前点击的数字
        let seld = e.target.innerText;
        // 获取计算后的日期
        this.list['currentDate'] = new Date(y, m, seld);
        // 去掉已选中的日期样式，为当前选中添加样式
        selectDate && selectDate.setAttribute('class', '');
        e.target.querySelector('span').setAttribute('class', 'sel-color');
      }
      else if (e.target.nodeName === 'LI' && e.target.querySelector('span').className === 'bgcolor') {
        // 获取当前点击的数字
        let seld = e.target.innerText;
        // 判断当前点击的日期是否大于15
        if (seld > 15) {
          m--;
          if (m < 0) {
            y--;
            m = 11;
          }
        }
        else {
          m++;
          if (m > 11) {
            y++;
            m = 0;
          }
        }
        // 获取计算后的日期
        let computedDate = new Date(y, m, 1).toLocaleDateString().split('/');
        cur.innerText = [computedDate[0], this.zeroPad(parseInt(computedDate[1]))].join('-');
        this.list['currentDate'] = new Date(y, m, seld);
        // console.log(y, m+1, seld);
        // 更新日历
        this.changeCalendar(y,m);
      }
      if (e.target.nodeName === 'LI') {
        // console.log(this.list.currentDate.toLocaleDateString());
        let date = this.list.currentDate;
        let y = date.getFullYear();
        let m = date.getMonth();
        let d = date.getDate();
        inputId.setAttribute('value',[y, this.zeroPad(m+1), this.zeroPad(d)].join('-'));
      }
    });
    // 点击input显示日历
    inputId.addEventListener('click', (e) => {
      e.preventDefault();
      this.updateClass();
    })
    // 将doc对象返回;
    return doc;
  }
  //农历转换
  // e2c () {
  //   TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
  //   var total,m,n,k;
  //   var isEnd=false;
  //   var tmp=TheDate.getYear();
  //   if(tmp<1900){
  //       tmp+=1900;
  //   }
  //   total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;

  //   if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
  //       total++;
  //   }
  //   for(m=0;;m++){
  //       k=(CalendarData[m]<0xfff)?11:12;
  //       for(n=k;n>=0;n--){
  //           if(total<=29+GetBit(CalendarData[m],n)){
  //               isEnd=true; break;
  //           }
  //           total=total-29-GetBit(CalendarData[m],n);
  //       }
  //       if(isEnd) break;
  //   }
  //   cYear=1921 + m;
  //   cMonth=k-n+1;
  //   cDay=total;
  //   if(k==12){
  //       if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
  //           cMonth=1-cMonth;
  //       }
  //       if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
  //           cMonth--;
  //       }
  //   }
  // }

  /** 开始：*移动端滑动事件**/
  getAngle (angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }
  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  getDirection (startx, starty, endx, endy) {
    let angx = endx - startx;
    let angy = endy - starty;
    let result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }

    let angle = this.getAngle(angx, angy);
    if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }
    return result;
  }
  /** 结束：*移动端滑动事件**/

  // 判断数字 <10，则加0
  zeroPad (n) {
    return String(n < 10 ? '0' + n : n);
  }
  // 月加/减
  plusMinus (param) {
    // 获取显示的日期
    let cur = document.querySelector('.current-date');
    let currDate = new Date(cur.innerText);
    // 获取日历id
    let y = currDate.getFullYear();
    let m = currDate.getMonth();
    // 判断是加还是减
    if (param === '+') {
      m++;
      if (m > 11) {
        y++;
        m = 0;
      }
    }
    else if (param === '-') {
      m--;
      if (m < 0) {
        y--;
        m = 11;
      }
    }
    else if (param === '++') {
      y++;
    }
    else if (param === '--') {
      y--;
    }
    // 获取计算后的日期
    let computedDate = new Date(y, m, 1).toLocaleDateString().split('/');
    cur.innerText = [computedDate[0], this.zeroPad(parseInt(computedDate[1]))].join('-');
    // 更新日历
    this.changeCalendar(y,m);
  }
  // 获取页面内容，操作数据
  changeCalendar (y,m) {
    // 更新日历
    let newArr = this.heart(new Date(y, m, 1));
    let ulList = [];
    // 获取日历所有的ul
    let lis = document.querySelectorAll('#calendar ul');
    for (let i = 0; i < lis.length; i ++) {
      let li = lis[i].querySelectorAll('li');
      ulList.push(li);
    }
    // 获取所有的日历，形式于newArr相同，并循环设置内容
    for (let i = 0; i < ulList.length; i ++) {
      for (let j = 0; j < ulList[i].length; j++) {
        let span = ulList[i][j].querySelector('span');
        span.innerText = newArr[i][j].day
        span.className = '';
        if (newArr[i][j].isShow === false) {
          span.setAttribute('class', 'bgcolor');
        }
        else {
          if (newArr[i][j].dateBg) {
            span.setAttribute('class', newArr[i][j].dateBg);
          }
        }
      }
    }
  }
  // 更新#list的类
  updateClass () {
    // 获取样式
    let classType = document.getElementById('list').getAttribute('class');
    let showIndex = classType.indexOf('show');
    let hiddenIndex = classType.indexOf('hidden');
    if (showIndex >= 0) {
      let start = classType.substring(0, showIndex);
      let end = classType.substring(showIndex+'show'.length);
      classType = start + 'hidden' + end;
      // 将第一次得到日期保存在变量中
      let today = this.list['currentDate'];
      let y = today.getFullYear();
      let m = today.getMonth();
      let d = today.getDate();
      // 日历初始化
      let inputId = document.querySelector('#inputValue input');
      inputId.setAttribute('value',[y, this.zeroPad(m+1), this.zeroPad(d)].join('-'));
    }
    else {
      let start = classType.substring(0, hiddenIndex);
      let end = classType.substring(hiddenIndex+'hidden'.length);
      classType = start + 'show' + end;
    }
    document.getElementById('list').setAttribute('class', classType);
  }
}

window.DatePlugin = DatePlugin

window.onresize = function(){
  let header = document.getElementById('header');
  // 判断当前处于什么端，移动/pc
  let mobile = /Android|webOS|iPhone|iPod|BlackBerry/i;
  if (mobile.test(navigator.userAgent)) {
    document.querySelector('#header .prev-m').style.display = 'none';
    document.querySelector('#header .next-m').style.display = 'none';
    header.setAttribute('class', 'center');
    // return doc;
  }
  else {
    document.querySelector('#header .prev-m').style.display = 'block';
    document.querySelector('#header .next-m').style.display = 'block';
    header.setAttribute('class', '');
  }
}
