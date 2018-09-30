class DatePlugin {
  constructor () {
    this.list = {};
    this.dateList = [];
    this.weekArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  }
  heart (today = new Date()) {
    // 获取今天日期
    // let today = new Date();
    // 获取年月日，星期
    let y = today.getFullYear();
    let m = today.getMonth();
    let d = today.getDate();
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
        date.dateBg = date.day === d ? 'sel-color' : '';
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
    // console.log(newArr);
    let doc = document.createDocumentFragment();
    // 添加日历
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
            // span.setAttribute('id', newArr[i][j].dateBg);
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

    header.innerHTML = `
      <a href="javascript:;" class="prev"><</a>
      <span class="current-date">${[y, this.zeroPad(m + 1), this.zeroPad(d)].join('-')}</span>
      <a href="javascript:;" class="next">></a>
    `;
    doc.appendChild(header);
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
  setCalendar (today = new Date()) {
    // today为当前日期，可以从后台获取，也可获取当前时间
    today = today ? new Date(today) : new Date();
    // // 判断num是不是在0~6之间
    // if (num > 1 || num < 0) {
    //   return 'num取值必须是0/1';
    // }
    let doc = document.createDocumentFragment();
    // 添加控制头
    let docHeader = this.setHeader(today);
    doc.appendChild(docHeader);
    // 添加星期几
    let docWeek = this.setWeek();
    doc.appendChild(docWeek);
    // 添加星期和日历
    let dateList = this.heart(today);
    let calendar = document.createElement('div');
    calendar.setAttribute('id', 'calendar');
    calendar.appendChild(dateList);
    doc.appendChild(calendar);
    // 设置选中的颜色
    // let selId = calendar.querySelector('.calendar ul li span#sel-color');
    // selId.setAttribute('class', 'sel-color');
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
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }
    return result;
  }
  // 初始化
  init () {
    // 获取header标签
    let header =  document.getElementById('header');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    // 判断当前处于什么端，移动/pc
    let mobile = /Android|webOS|iPhone|iPod|BlackBerry/i;
    if (mobile.test(navigator.userAgent)) {
      this.moveDate();
      header.removeChild(prev);
      header.removeChild(next);
      header.setAttribute('class', 'center');
    }
    else {
      this.switchDate();
    }
    // 调用初始化时日历样式
    this.updateStyl();
    // 调用点击事件
    this.handleClick();
  }
  // pc端点击事件
  switchDate () {
    // 选择上下月份
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    // 网页端点击事件
    prev.addEventListener('click', (e) => {
      e.preventDefault();
      // 减减
      this.plusMinus('-');
    })
    next.addEventListener('click', (e) => {
      e.preventDefault();
      // 加加
      this.plusMinus('+');
    })
  }
  // 移动端滑动事件
  moveDate () {
    // 移动端滑动事件
    let list = document.getElementById('list');
    let startx,starty,endx,endy;
    //手指接触屏幕
		list.addEventListener("touchstart", (e) => {
      startx = e.touches[0].pageX || e.targetTouches[0].pageX;
      starty = e.touches[0].pageY || e.targetTouches[0].pageY;
    }, false);
    //手指离开屏幕
    // let _this = this;
    list.addEventListener("touchend", (e) => {
      // calendarCl = document.querySelector('.calendar');
      // let endx, endy;
      endx = e.changedTouches[0].pageX || e.targetTouches[0].pageX;
      endy = e.changedTouches[0].pageY || e.targetTouches[0].pageY;
      let direction = this.getDirection(startx, starty, endx, endy);

      switch (direction) {
          case 0:
              break;
          case 1:
              // this.reduce();
              this.plusMinus('-');
              break;
          case 2:
              // this.add();
              this.plusMinus('+');
              break;
          case 3:
              this.plusMinus('+');
              break;
          case 4:
              this.plusMinus('-');
              break;
          default:
      }
    }, false);
  }
  // 修改ul样式
  updateStyl () {
    // 获取每个日历的宽度
    let lis = document.querySelectorAll('#calendar ul li');
    let width = lis[0].offsetWidth;
    // 循环修改li/span的高度
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.height = width + 'px';
      lis[i].style.lineHeight = width + 'px';
      let span = lis[i].querySelector('span');
      span.style.width = width * .8 + 'px';
      span.style.height = width * .8 + 'px';
      span.style.lineHeight = width * .8 + 'px';
      span.style.display = 'inline-block';
    }
  }
  /** 结束：*移动端滑动事件**/

  handleClick () {
    // 获取当月所有的li
    let eventCal = document.getElementById('calendar');
    // console.log(date);
    eventCal.addEventListener('click',(e) => {
      e.preventDefault();
      // 获取显示的日期
      let calendarId = document.getElementById('calendar');
      let calendarCl = document.querySelector('.calendar');
      let cur = document.querySelector('.current-date');
      let currDate = new Date(cur.innerText);
      let y = currDate.getFullYear();
      let m = currDate.getMonth();
      // 获取已选中的日期
      let selectDate = document.querySelector('.sel-color');
      // 判断点击的是否为span元素
      if (e.target.nodeName === 'SPAN' && e.target.className !== 'bgcolor') {
        // 获取当前点击的数字
        let seld = e.target.innerText;
        // 获取计算后的日期
        let computedDate = new Date(y, m, seld).toLocaleDateString().split('/')
        cur.innerText = [computedDate[0], this.zeroPad(parseInt(computedDate[1])), this.zeroPad(computedDate[2])].join('-');
        // 去掉已选中的日期样式，为当前选中添加样式
        selectDate.className = '';
        e.target.setAttribute('class', 'sel-color');
      }
      else if (e.target.nodeName === 'SPAN' && e.target.className === 'bgcolor') {
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
        calendarId.removeChild(calendarCl);
        // 获取计算后的日期
        let computedDate = new Date(y, m, seld).toLocaleDateString().split('/')
        cur.innerText = [computedDate[0], this.zeroPad(parseInt(computedDate[1])), this.zeroPad(computedDate[2])].join('-');
        // 去掉已选中的日期样式，为当前选中添加样式
        selectDate.className = '';
        e.target.setAttribute('class', 'sel-color');
        calendarId.appendChild(this.heart(new Date(y, m, seld)));
        // 调用更新后的样式
        this.updateStyl();
      }
    });
  }

  // 判断数字 <10，则加0
  zeroPad (n) {
    return String(n < 10 ? '0' + n : n);
  }
  // 加/减
  plusMinus (param) {
    // 获取显示的日期
    let calendarId = document.getElementById('calendar');
    let calendarCl = document.querySelector('.calendar');
    let cur = document.querySelector('.current-date');
    let currDate = new Date(cur.innerText);
    // 获取日历id
    let y = currDate.getFullYear();
    let m = currDate.getMonth();
    let d = currDate.getDate();
    if (param === '+') {
      m++;
      if (m > 11) {
        y++;
        m = 0;
      }
    }
    else {
      m--;
      if (m < 0) {
        y--;
        m = 11;
      }
    }
    calendarId.removeChild(calendarCl);
    // 获取计算后的日期
    let computedDate = new Date(y, m, d).toLocaleDateString().split('/')
    // let computedDate = new Date(y, m, 1).toLocaleDateString().split('/')
    cur.innerText = [computedDate[0], this.zeroPad(parseInt(computedDate[1])), this.zeroPad(computedDate[2])].join('-');
    // cur.innerText = [computedDate[0], this.zeroPad(parseInt(computedDate[1]))].join('-');
    // 更新日历
    calendarId.appendChild(this.heart(new Date(y, m, d)));
    // 调用更新后的样式
    this.updateStyl();
  }
}

window.DatePlugin = DatePlugin
