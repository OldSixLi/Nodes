/*
 * 母版页逻辑代码
 * @Author:马少博 (ma.shaobo@qq.com)
 * @Date: 2017年6月22日14:50:58
 * @Last Modified by: 马少博
 * @Last Modified time:2017年6月22日14:51:02
 */
function reinitIframe() {
  var iframe = document.getElementById("frame_content");
  try {
    iframe.height = iframe.contentWindow.document.documentElement.scrollHeight;
  } catch (ex) {}
}


var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http, $timeout) {
  var searchObj = new UrlSearch();
  if (searchObj.hesid) {
    var id = searchObj.hesid;
  }

  $http.get(BasicUrl + "admin/" + id).success(function(data) {
    if (data != null && data != "" && data != "null") {
      $scope.roleId = data.role;
      console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
      console.log("当前的用户身份为：" + $scope.roleId);
      console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
    }
  });
});
window.setInterval("reinitIframe()", 200);
//当前登录用户的身份ID
var currentAdminId;
$(function() {
  //获取前台参数
  var searchObj = new UrlSearch();
  if (searchObj.hesid) {
    var id = searchObj.hesid;
    currentAdminId = id;
    // $.ajaxSetup({
    //   beforeSend: function(request) {
    //     request.setRequestHeader("authorization", currentAdminId + '_' + token());
    //   }
    // });

    //获取当前登录的身份
    $.get(BasicUrl + "admin/" + id).success(function(data) {
      if (data != null && data != "" && data != "null") {　

        //存储相关信息
        $("#adminNo").val(data.adminNo);
        $("#adminId").val(id);
        $("#name").val(data.name);
        $("#role").val(data.role);
        $("#job").val(data.job);
        $("#iconUrl").val(data.iconUrl);
        $("#token").val(token())
      } else {
        alert("获取用户身份出错，请重新登录1！");
        // location.replace('Login.html');
      }
    }).error(function() {
      alert("获取用户身份出错，请重新登录2！");
      // location.replace('Login.html');
    });

    //定时获取用户通知
    getNotice();
    setInterval(function() {
      getNotice();
    }, 30000);
  }
  /**
   * 获取当前登录用户的未读信息 
   * @returns 
   */
  function getNotice() {
    $.get(BasicUrl + "notice/?adminId=" + currentAdminId).success(function(data) {
      if (data != null && data != "" && data != "null") {　
        handleError(data, function(data) {
          var fill = data.ReportToBeFilledCount || 0;
          var reply = data.ReportToBeRepliedCount || 0;
          var total = fill + reply;
          alert(total)
          fill == 0 || $(".ReportToBeFilledCount").find('span').text(fill);
          reply == 0 || $(".ReportToBeRepliedCount").find('span').text(reply);
          total == 0 || $("#totalNotice").text(total);
        })

      }
    });
  }
  //跳转到会员报告列表页面
  $(".ReportToBeFilledCount").on('click', function() {
    var href = $(this).attr("data-link") + "?adminId=" + currentAdminId;
    $("#work-frame").attr("src", href);
  });
  //跳转到咨询列表页面
  $(".ReportToBeRepliedCount").on('click', function() {
    var href = $(this).attr("data-link") + "?adminId=" + currentAdminId;
    $("#work-frame").attr("src", href);
  });

  // 菜单栏方法
  $("div.menu").find("dl").each(function(index) {
    $(this).find("dt").on("click", function(e) {
      $("[data-for]").hide();
      if ($(this).parent().hasClass('expand')) {
        $(this).parent().removeClass("expand");
        return false;
      }
      if (!$(this).parent().is(".expand ")) {
        // 判断其他的是否有展开的，收起
        $(".menu dl.expand").removeClass("expand");
        $(this).parent().addClass("expand");
      }
      $(".second-menu").removeClass('on');
    });
  });

  //子菜单单击事件
  $("dd").each(function() {
    $(this).click(function() {
      var href = $(this).attr("data-link");
      $("dd").removeClass('action');
      $(this).addClass('action');
      if ($(this).hasClass('rela')) {}
      $("#work-frame").attr("src", href);
    });
  });

  //父菜单单击事件
  $(".second-menu").each(function() {
    $(this).click(function(e) {
      e.stopPropagation();
      if ($(this).hasClass('on')) {
        $(".second-menu").removeClass('on');
        var id = $(this).attr('id');
        $("[data-for='" + id + "']").hide();
      } else {
        var id = $(this).attr('id');
        $("[data-for]").hide();
        $("[data-for='" + id + "']").show();
        $(".second-menu").removeClass('on');
        $(this).addClass('on');
      }
    })
  });
});

/**
 * 退出功能 
 * @returns 
 */
function logout(event) {
  confirms("提示", "确认退出后台管理系统吗？", function() {
    location.replace('Login.html');
    event.returnValue = false;
  }, function() {});
}

/**
 * 确认提示框 
 * @returns 
 */
function confirms(title, content, okCallback, cancelCallback) {
  var confirm = okCallback && typeof okCallback === "function" ? okCallback :
    function() {};
  var cancel = cancelCallback && typeof cancelCallback === "function" ? cancelCallback :
    function() {};
  if (myBrowser() == "IE8") {
    bootbox.confirm({
      buttons: {
        confirm: {
          label: '确认',
          className: 'btn-success'
        },
        cancel: {
          label: '取消',
          className: 'btn-default'
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
    $.confirm({
      title: title,
      content: content,
      confirm: confirm,
      cancel: cancel,
      confirmButton: '确定',
      cancelButton: '取消',
      confirmButtonClass: 'btn-success',
      cancelButtonClass: 'btn-default',
      backgroundDismiss: false,
      animation: 'zoom',
      closeAnimation: 'scale'
    });
  }
}