var params = ""; //全局变量
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $scope.selected = [];
  $scope.isChecked = function(x) {
    return $scope.selected.indexOf(x) >= 0;
  };


  $http.get(BasicUrl + "appointmentItems/All").success(function(data) {
    if (data != null && data != "" && data != "null") {
      $scope.options = data;
    }
    tool.changeSelect($("#sltItem"), false);
  });
  $scope.updateSelection = function($event, x) {

    var checkbox = $event.target;
    var checked = checkbox.checked;
    if (checked) {
      $scope.selected.push(x);
      console.log($scope.selected.join(','));
    } else {
      var idx = $scope.selected.indexOf(x);
      $scope.selected.splice(idx, 1);
      console.log($scope.selected.join(','));
    }
  };
  //分页方法声明
  var pageing = function(pageindex, params) {
      //TODO  需要修改部分http://healthshare.com.cn:80/admin/api/api-docs/../vip?
      var url = BasicUrl + "vip?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
      $http.get(url).success(function(data) {
        if (data != null && data != "" && data != "null") {
          //判断当前是否存在记录
          $scope.dataLengths = data.content.length > 0;
          if (data.content != null && data.content.length > 0) {
            //赋值操作
            $scope.data = data;
            $scope.totalPage = data.totalPages;
            $scope.totalRecord = data.totalElements;
            //调用生成分页方法
            initPageDiv($("#alreadyPage"), //在哪里生成页码
              pageindex + 1, //当前页
              data.totalPages, //总页数
              5, //每次显示多少页
              $("#currentPage"), //隐藏域的值：当前页数
              function() {
                pageing($("#currentPage").val() - 1, params);
              });
          } else {
            // tool.alert("提示", "未获取到数据，请重试");
          }
        }
      });
    }
    //分页方法
  pageing(0, params);
  //查询按钮
  $scope.search = function() {
    // alert('a');
    //用户名称
    var username = $("#keyword").val();
    //会员类型
    var phone = $("#phone").val();
    //校验只有一个搜索条件
    if (!(phone || username)) {
      tool.alert("提示", "请至少输入一个搜索条件");
      return false;
    }

    params = "";
    var keyword = "";
    if (username) {
      params = "realName=" + username + '&';
    }
    if (phone) {
      // keyword = phone;
      params = "mobile=" + phone + '&';
    }

    pageing(0, params);
  }


  //跳转至某页方法
  $scope.skip = function() {
    if ($scope.toPageValue <= 1) {
      $scope.toPageValue = 1;
    } else if ($scope.toPageValue > $scope.totalPage) {
      $scope.toPageValue = $scope.totalPage;
    }
    pageing($scope.toPageValue - 1, params);
  }

  /**
   * 获取多选框（CheckBox）的值 
   * @param {any} name 控件名称
   * @returns 
   */
  function getCheckBoxValue(name) {
    var obj = document.getElementsByName(name);
    var s = [];
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].checked) {
        s.push(obj[i].value);
      }
    }
    return s.join(',');
  }

  $scope.save = function() {
    if (!$("input[type='radio']:checked").val()) {
      tool.alert("提示", "请选择会员进行预约");
      return false;
    }

    if (!getCheckBoxValue('orderItems')) {
      tool.alert("提示", "请选择预约项目");
      return false;
    }


    var saveInfo = {
      userId: parseInt($("input[type='radio']:checked").val()),
      appointmentTime: Date.parse(new Date($("#date").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#date").val())),
      itemId: getCheckBoxValue('orderItems'),
      comment: $scope.notes
    }
    $.post(BasicUrl + 'appointment', saveInfo, function(data, status, jqXHR) {
      if (status == 'success' && jqXHR.status == 200) {


        if (data.errorMessage) {
          tool.alert("提示", data.errorMessage);
        } else {
          tool.alert('提示', '保存成功', function() {
            $('#orderForm')[0].reset();
            $("input:radio[name=userId]").attr("checked", false);
            // $("input[name='userId']").val(""); 
          });
        }


      } else {
        tool.alert('提示', '保存失败');
      }
    });
  }

  //加载完毕后再显示 
  $scope.$watch("viewContentLoaded", function() {
    angular.element(".myload").removeClass("myload");
  });
});