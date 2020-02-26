const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 根据客户端的时间信息得到发表评论的时间格式
 * 多少分钟前,多少小时前,昨天,月日
 * Para:
 * recodeTime-{float} 时间戳
 * yearsFlag-{bool} 是否要年份
 */
function getDiffTime(recordTime,yearsFlag){
  if(recordTime){
    recordTime=new Date(parseFloat(recordTime)*1000);
    var minute = 1000*60,
      hour = minute * 60,
      day = hour * 24,
      now = new Date(),
      diff = now - recordTime;
    var result = '';
    if(diff<0){
      return result;
    }
    var weekR = diff/(7*day);
    var dayC = diff/day;
    var hourC = diff/hour;
    var minC = diff/minute;
    if(weekR>=1){
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
    
      return recordTime.format(formate);
    }else if(dayC == 1 || (hourC<24 && recordTime.getDate()!=now.getDate())){
      result = '昨天'+recordTime.formate('hh:mm');
      return result;
    }else if(dayC>1){
      var formate = 'MM-dd hh:mm';
      if(yearsFlag){
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }else if(hourC >=1){
      result = parseInt(minC)+'分钟前';
      return result;
    }else{
      result = '刚刚';
      return result;
    }
  }
  return '';
}

/**
 * 此方法来源于网络
 * 拓展Date方法,得到格式化的日期形式
 * date.formate('yyyy-MM-dd'),date.formate('yyyy/MM/dd'),date.formate('yyyy-MM-dd'),
 * date.formate('dd.MM.yy'),date.formate('yyyy.dd.MM'),date.formate('yyyy-MM-dd HH:mm')
 * 使用方法:
 *  var date = new Date();
 *  var todayFormate = date.formate('yyyy-MM-dd');
 * Parameters:
 * format-{String} 目标格式 类似 {yyyy-MM-dd}
 * Returns-{String} 格式化后的日期
 */
(function initTimeFormate(){
  Date.prototype.format = function(format){
    var o = {
      "M +":this.getMonth()+1,//month
      "d +":this.getDate(),//day
      "h +":this.getHours(),//hour
      "m +":this.getMinutes,//minute
      "s +":this.getSeconds(),//second
      "q +":Math.floor((this.getMonth()+3)/3),//quarter
      "S":this.getMilliseconds()//millisecond
    }

    if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear()+"").substr(4-RegExp.$1.length));
    for(var k in o) if (new RegExp("("+k+")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1?o[k]:
          ("00" + o[k]).substr((""+o[k]).length));
    return format;
  };
})()




module.exports = {
  getDiffTime: getDiffTime,
  formatTime: formatTime
}