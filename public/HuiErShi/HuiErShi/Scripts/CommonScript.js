/**
 * 通用脚本库
 * @马少博 (1030809514@qq.com)
 * @date    2016-12-09 16:26:17
 * @version 1.0
 */
//将form表单内容序列化为JSON
// var BasicUrl = "http://localhost/admin/api/"; //测试环境地址
// var BasicUrl = "http://healthshare.com.cn:80/admin/api/"; //正式环境地址
var BasicUrl = "http://114.55.67.92:8080/admin/api/"; //测试环境地址


(function($) {
  $.fn.serializeJson = function() {
    var serializeObj = {};
    var array = this.serializeArray();
    var str = this.serialize();
    $(array).each(function() {
      if (serializeObj[this.name]) {
        if ($.isArray(serializeObj[this.name])) {
          serializeObj[this.name].push(this.value);
        } else {
          serializeObj[this.name] = [serializeObj[this.name], this.value];
        }
      } else {
        serializeObj[this.name] = this.value;
      }
    });
    return serializeObj;
  };
})(jQuery);


$(function() {
  if ($(".start_end_time")) {
    $(".start_end_time").datetimepicker();
  }

  $("#imageStartBtn").click(function() {
    $("#imageStartTime").datetimepicker('show');
  });

  $("#imageEndBtn").click(function() {
    $("#imageEndTime").datetimepicker('show');
  });
  if ($.datetimepicker) {
    $.datetimepicker.setLocale('ch'); //时间选择控件默认设置中文
  }

  /// <summary>悬浮于一级菜单时显示二级菜单的内容</summary>
  $("#mainMenu>li>a").each(function(index) {
    $(this).hover(function() {
      var position = $(this).offset();
      var selector = $(this).attr("data-SecondMenu");
      var marginleft = position.left - $(selector).find("li").size() * 45 + 45;
      $("#mainMenu>li").removeClass("active");
      $(this).parent().addClass("active");
      $(selector).toggleClass("active").css("padding-left", marginleft + 'px');
    });
  });
});


$(function() {
  /// <summary>表格排序功能</summary>
  var isdesc = false; //定义一个全局变量，用来确定升序还是降序
  $("[data-type]").click(function() {
    //  点击列表的表头进行排序，图标操作部分start
    $(this).find("span").addClass("glyphicon").end().siblings("th").find("span").removeClass();
    //添加正序或倒序图标
    if (isdesc) {
      isdesc = false;
      $(this).find("span").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down").attr("title", "降序");
    } else {
      isdesc = true;
      $(this).find("span").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up").attr("title", "升序");
    }
    //图标操作部分 end
    //当前TH的行数以及列数序号
    var trlength = $(".fixed-table-container tr").length - 1,
      colunindex = $(this).index();
    //获取需要进行比对的数据行
    var tablearr = $.makeArray($("tbody tr:lt(" + trlength + ")"));
    //排序规则三种：1、时间；2、字符串；3、数字
    if ($(this).attr("data-type") === "time") { //时间类型值排序操作
      tablearr.sort(function(a, b) {
        return isdesc ? timescompare($(a).find('td').eq(colunindex).text(), $(b).find('td').eq(colunindex).text()) : timescompare($(b).find('td').eq(colunindex).text(), $(a).find('td').eq(colunindex).text());
      });
    } else if ($(this).attr("data-type") === "str") { //字符串类型值排序操作
      tablearr.sort(function(a, b) {
        var avalue = $(a).find("td").eq(colunindex).text().trim();
        var bvalue = $(b).find("td").eq(colunindex).text().trim();
        return isdesc ? avalue.localeCompare(bvalue) : bvalue.localeCompare(avalue);
        //return avalue < bvalue;
        var ass = 0;
        ass = ass > 0 ? 1 : 2;
      });
    } else if ($(this).attr("data-type") === "num") { //数字类型值排序操作
      tablearr.sort(function(a, b) {
        var avalue = parseInt($(a).find("td").eq(colunindex).text()) - 0;
        var bvalue = parseInt($(b).find("td").eq(colunindex).text()) - 0;
        return isdesc ? avalue - bvalue : bvalue - avalue;
      });
    }
    //重新添加到页面中
    var tbody = $("<tbody></tbody>").append($(tablearr));
    $("tbody").prepend($(tbody).html());
  });
});


/**
 * 时间比较函数（直接提取数字进行比较）
 * 
 * @param {any} a 
 * @param {any} b 
 * @returns 
 */
function timescompare(a, b) {
  return a.replace(/[^0-9]+/g, "") - b.replace(/[^0-9]+/g, "");
}

/**
 * 分隔获取各个参数
 * 
 */
function UrlSearch() {
  var name, value;
  var str = location.href; //取得整个地址栏
  var num = str.indexOf("?");
  str = str.substr(num + 1);
  var arr = str.split("&"); //各个参数放到数组里
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      this[name] = value;
    }
  }
}

//分页控件的初始化
function initPageDiv($dom, now, all, each, $dom2, change) {
  if (parseInt(now) > parseInt(all)) {
    return;
  }
  var options = {
    bootstrapMajorVersion: 3,
    currentPage: now, // 当前页
    totalPages: all, // 共几页
    numberOfPages: each, // 每次显示几页
    itemTexts: function(type, page, current) { // 修改显示文字
      switch (type) {
        case "first":
          return "首页";
        case "prev":
          return "<";
        case "next":
          return ">";
        case "last":
          return "尾页";
        case "page":
          return page;
      }
    },
    onPageClicked: function(event, originalEvent, type, page) { // 异步换页
      $dom2.val(page);
      change();
    }
  }
  $dom.bootstrapPaginator(options);
};

/**
 * 判断浏览器版本
 * 
 * @returns 
 */
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
  if (isIE) {
    var IE5 = IE55 = IE6 = IE7 = IE8 = false;
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    IE55 = fIEVersion == 5.5;
    IE6 = fIEVersion == 6.0;
    IE7 = fIEVersion == 7.0;
    IE8 = fIEVersion == 8.0;
    if (IE55) {
      return "IE55";
    }
    if (IE6) {
      return "IE6";
    }
    if (IE7) {
      return "IE7";
    }
    if (IE8) {
      return "IE8";
    }
  } //isIE end
  if (isFF) {
    return "FF";
  }
  if (isOpera) {
    return "Opera";
  }
};



/**
 * 获取当前登录的用户的身份信息（NOTE:仅限于iframe内页面使用）
 * 
 * @returns 
 */
function getAdmin() {
  var adminData = {
    token: $('#token', window.parent.document).val(),
    adminId: $('#adminId', window.parent.document).val(),
    adminNo: $('#adminNo', window.parent.document).val(),
    name: $('#name', window.parent.document).val(),
    role: $('#role', window.parent.document).val(),
    job: $('#job', window.parent.document).val(),
    iconUrl: $('#iconUrl', window.parent.document).val()
  };
  return adminData;
}

/**
 * 获取当前登录的用户的ID
 * @returns 
 */
function adminId() {
  return getCookie('adminId');
}


function getToken() {
  var token = getCookie('token');
  return token;
}

/**
 * 获取用户登录时获取的token
 * 
 * @returns 
 */
function token() {
  var token = getCookie('token');
  return token;
}

/**
 * 请求头中的token
 * 
 * @returns 
 */
function headertoken() {
  return adminId() + '_' + token();
}


/**
 * 判断当前操作的用户是否为正常登陆
 * 
 * @returns 
 */
function testAdmin() {
  return adminId > 0;
}

/**
 * 把当前加载的地址存储进cookie里
 * 
 */
function setCurrent() {
  var url = window.location.href;
  setCookie('currentUrl', url, 500);
}




/**
 * 读取当前cookie存储的地址
 * 每次刷新页面时都从cookie中读取相关的URL地址，可以保持刷新的页面没变
 */
function readCurrentUrl() {
  var currentUrl = getCookie('currentUrl');
  if (currentUrl) {
    $("#work-frame").attr("src", currentUrl);
  }
}
// setCookie('currentUrl', '666.html?id=1', 500)
// alert()
var JSTOOL = function() {
  // 下拉菜单样式
  this.changeSelect = function($dom, hasSearch) {
    var selectNum = 0;
    if (typeof(hasSearch) != 'undefined') {
      if (hasSearch == false) {
        selectNum = -1;
      }
    }
    $dom.select2({
      tags: true,
      maximumSelectionLength: 3,
      minimumResultsForSearch: selectNum
        // 最多能够选择的个数
    });
  };
  // 提示
  this.alert = function(title, content, callback, className) {
    var confirm = callback && typeof callback === "function" ? callback :
      function() {};
    if (myBrowser() == "IE8") {
      window.top.bootbox.alert({
        buttons: {
          ok: {
            label: '',
            className: 'btn-primary'
          }
        },
        message: content,
        callback: function() {
          confirm();
        },
        title: title,
      });
    } else {
      var alertClass = "";
      if (typeof className == "undefined") {
        alertClass = 'offset4 col-md-4 col-md-offset-4';
      } else {
        alertClass = className;
      }
      window.top.$.alert({
        title: title,
        content: content,
        confirm: confirm,
        confirmButton: '确定',
        backgroundDismiss: false,
        confirmButtonClass: 'btn-success',
        animation: 'zoom',
        closeAnimation: 'scale',
        columnClass: alertClass
      });
    }
  };
  // 确认框
  this.confirm = function(title, content, okCallback, cancelCallback) {
    var confirm = okCallback && typeof okCallback === "function" ? okCallback :
      function() {};
    var cancel = cancelCallback && typeof cancelCallback === "function" ? cancelCallback :
      function() {};
    if (myBrowser() == "IE8") {
      window.top.bootbox.confirm({
        buttons: {
          confirm: {
            label: '确认',
            className: 'btn-success'
          },
          cancel: {
            label: '取消',
            className: 'btn-danger'
          }
        },
        message: content,
        callback: function(result) {
          if (result) {
            confirm();
          } else {
            cancel();
          }
        },
        title: title,
      });
    } else {
      var confirm = okCallback && typeof okCallback === "function" ? okCallback : function() {};
      var cancel = cancelCallback && typeof cancelCallback === "function" ? cancelCallback : function() {};
      window.top.window.top.$.confirm({
        title: title,
        content: content,
        confirm: confirm,
        cancel: cancel,
        confirmButton: '确定',
        cancelButton: '取消',
        confirmButtonClass: 'btn-success',
        cancelButtonClass: 'btn btn-default',
        backgroundDismiss: false,
        animation: 'zoom',
        closeAnimation: 'scale'
      });
    }
  };

  // 确认框
  this.alertImg = function(title, content, okCallback, cancelCallback) {
    var confirm =
      function() {
        // alert(window.top.$(".imgContent").find("img.img-responsive").attr('src'));
        var $img = window.top.$(".imgContent").find("img.img-responsives");
        console.log($img);
        var jiaodu = $img.attr("data-deg") - 0 + 90;
        var translates = 'rotateZ(' + jiaodu + 'deg) ';
        $img.attr("data-deg", jiaodu);
        $img.css('transform', translates);
        return false;
      };
    var cancel = cancelCallback && typeof cancelCallback === "function" ? cancelCallback :
      function() {};
    if (myBrowser() == "IE8") {
      window.top.bootbox.confirm({
        buttons: {
          confirm: {
            label: '旋转',
            className: 'btn-success'
          },
          cancel: {
            label: '关闭',
            className: 'btn-danger'
          }
        },
        message: content,
        callback: function(result) {
          if (result) {
            confirm();
          } else {
            cancel();
          }
        },
        title: title,
        columnClass: "col-md-10 col-md-offset-1 imgContent"
      });
    } else {
      var confirm = function() {
        var $img = window.top.$(".imgContent").find("img.img-responsives");
        var jiaodu = $img.attr("data-deg") - 0 + 90;
        var translates = 'rotateZ(' + jiaodu + 'deg) ';
        $img.attr("data-deg", jiaodu);
        $img.css('transform', translates);
        return false;
      };
      var cancel = cancelCallback && typeof cancelCallback === "function" ? cancelCallback : function() {};
      window.top.window.top.$.confirm({
        title: title,
        content: content,
        confirm: confirm,
        cancel: cancel,
        confirmButton: '旋转',
        cancelButton: '关闭',
        confirmButtonClass: 'btn-success',
        cancelButtonClass: 'btn btn-default',
        backgroundDismiss: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        columnClass: "col-md-10 col-md-offset-1 imgContent"
      });
    }
  };
  // 对话框
  this.dialog = function(title, content) {
    window.top.$.dialog({
      title: title,
      content: content,
      animation: 'zoom',
      closeAnimation: 'scale'
    });
  };
};
var tool = new JSTOOL();

// ********************************Cookie相关操作***************************
/**
 * 设置cookie值
 * 
 * @param {any} name 
 * @param {any} value 
 * @param {any} seconds 
 */
function setCookie(name, value, seconds) {
  seconds = seconds || 0; //seconds有值就直接赋值，没有为0 
  var expires = "";
  if (seconds != 0) { //设置cookie生存时间
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

/**
 * 读取cookie
 * 
 * @param {any} name 
 * @returns 
 */
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}