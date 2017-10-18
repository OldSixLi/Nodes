getAdmin();
var params = ""; //全局变量
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  //分页方法声明
  var pageing = function(pageindex, params) {
    //请求地址
    var url = BasicUrl+"user?" + params + "page=" + pageindex + "&pageNum=10";
    $http.get(url).success(function(data) {
      if (data != null && data != "" && data != "null") {
        //判断当前是否存在记录
        $scope.dataLengths = data.content.length > 0;
        if (data.content != null && data.content.length > 0) {
          //赋值操作
          $scope.title = 'time';
          $scope.desc = 0;
          $scope.names = data;
          $scope.totalPage = data.totalPages;
          $scope.totalRecord = data.totalElements;
          //此处处理将列表按照名字排序，然后添加相关的字段值
          var arr = $scope.names.content;
          arr.sort(function(a, b) {
            if ($scope.desc) {
              return a.userName.localeCompare(b.userName, 'zh');
            } else {
              return b.userName.localeCompare(a.userName, 'zh');
            }
          });
          for (var index = 0; index < $scope.names.content.length; index++) {
            var element = $scope.names.content[index];
            element.sortIndex = index;
          }
          //调用生成分页方法
          initPageDiv($("#alreadyPage"), //在哪里生成页码
            pageindex + 1, //当前页
            data.totalPages, //总页数
            5, //每次显示多少页
            $("#currentPage"), //隐藏域的值：当前页数
            function() {
              pageing($("#currentPage").val() - 1, params);
            });
        }
      }
    });
  }

  //分页方法
  pageing(0, params);

  //查询按钮
  $scope.search = function() {
    //TODO  需要修改部分
    //起始时间时间戳
    var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
    //结束时间时间戳
    var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
    //用户名称
    var username = $("#txtUserName").val();
    //校验只有一个搜索条件
    if (!(minExpiredAt || maxExpiredAt || username)) {
      tool.alert("提示", "请至少输入一个搜索条件");
      return false;
    }
    //起止日期校验
    if (minExpiredAt && maxExpiredAt && minExpiredAt > maxExpiredAt) {
      tool.alert("提示", "结束时间不得早于起始时间");
      return false;
    }

    params = '';
    if (minExpiredAt) {
      params += "minCreatedAt=" + minExpiredAt + '&';;
    }
    if (maxExpiredAt) {
      params += "maxCreatedAt=" + maxExpiredAt + '&';
    }
    if (username) {
      params += "userName=" + username + '&';
    }
    pageing(0, params);
  }

  //排序方法
  $scope.sort = function(ziduan) {

    var classname = '';
    if ($scope.desc) {
      classname = 'glyphicon glyphicon-arrow-down';
    } else {
      classname = 'glyphicon glyphicon-arrow-up';
    }

    $("[data-order]").find('span').addClass('glyphicon glyphicon-sort');
    $("[data-order='" + ziduan + "']").find('span').removeClass().addClass(classname);
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

  //加载完毕后再显示 
  $scope.$watch("viewContentLoaded", function() {
    angular.element(".myload").removeClass("myload");
  });
});