toNormalTime(shijianchuo);
/**
 * 时间戳转化为正常时间 
 * @param {any} shijianchuo  时间戳 精确到毫秒
 * @returns 正常时间
 */
function toNormalTime(shijianchuo) {
  var time = new Date(parseInt(shijianchuo));
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function add0(m) { return m < 10 ? '0' + m : m; }

//
// var time = '2015-06-27';\r\nconsole.log(Date.parse(new Date(time)));

console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
console.log(toTimestamp('2015-06-27'));
console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");

/**
 * 
 * 
 * @param {any} timestr 
 * @returns 
 */
function toTimestamp(timestr) {
  //   return new Date(timestr).setHours(0); //设置时间为一天开始
  return Date.parse(new Date(timestr)).toString() == "NaN" ? 0 : Date.parse(new Date(timestr));
}




/**
 * 深度克隆对象
 * 
 * @param {any} obj 对象
 * @returns 
 */
function cloneObj(obj) {
  var o = obj.constructor == Object ? new obj.constructor() : new obj.constructor(obj.valueOf());
  for (var key in obj) {
    if (o[key] != obj[key]) {
      if (typeof(obj[key]) == 'object') {
        o[key] = mods.cloneObj(obj[key]);
      } else {
        o[key] = obj[key];
      }
    }
  }
  return o;
}
var a = {
  name: 'liu',
  age: 20
};

var bb = cloneObj(a);
bb.name = '张三';
console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
console.log(a);
console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");

console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
console.log(bb);
console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");


/**
 * 数组去重
 * 
 * @param {any} arr 去重前数组
 * @returns 去重后数组
 */
function uniqueArr(arr) {
  var result = [],
    json = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!json[arr[i]]) {
      json[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};

/**
 * 数组去重
 * 
 * @param {any} arr 去重前数组
 * @returns 去重后数组
 */
function uniqueArr(arr) {
  var result = [],
    json = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!json[arr[i]]) {
      json[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};

console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
console.log(uniqueArr([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 3, 4]).join(','));
console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");