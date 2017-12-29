var urlObj = new UrlSearch();
/**
 * 分隔获取各个参数
 * 根据URL地址获取其参数
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
$(function() {
  // $(".start_end_time").datetimepicker();
  // var tool = new JSTOOL();
  // tool.changeSelect($("#userId"), true);
  //  alert(urlObj.userid)
  $("#userId").select2({
    placeholder: '请选择',
    allowClear: true,
    ajax: {

      url: function(params) {
        return BasicUrl + "vip/name/" + params.term;
      },
      dataType: 'json',
      delay: 250,
      processResults: function(data, page) {
        return {
          results: data
        };
      },
      cache: false
    },
    minimumInputLength: 1,
    minimumResultsForSearch: 1,
    width: "150px", //宽度设置
    templateResult: formatRepo,
    templateSelection: formatRepoSelection,
  });

  function formatRepo(repo) {
    return repo.realName;
  }

  function formatRepoSelection(repo) {
    return repo.realName;
  }
});
var params = ""; //全局变量

var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  //分页方法声明
  var pageing = function(pageindex, params) {
    //请求地址
    ////&page=0&pageNum=10
    //TODO  需要修改部分 

    var url = BasicUrl + "medicine?" + params + "page=" + pageindex + "&pageNum=10";
    $http.get(url).success(function(data) {
      if (data != null && data != "" && data != "null") {
        //判断当前是否存在记录
        $scope.dataLengths = data.content.length > 0;
        if (data.content != null && data.content.length > 0) {
          //赋值操作
          // $scope.title = 'FP_HM'; //排序字段
          $scope.desc = 0; //排序方式（默认升序）
          $scope.data = data;
          $scope.username = $("#userId").find("option:selected").text();
          $scope.totalPage = data.totalPages;
          $scope.totalRecord = data.totalElements;
          //调用生成分页方法
          initPageDiv($("#alreadyPage"), pageindex + 1, data.totalPages, 5, $("#currentPage"), function() {
            pageing($("#currentPage").val() - 1, params);
          });
        } else {
          tool.alert("提示", "未获取到数据");
        }
      }
    });
  }

  //分页方法
  if (urlObj.userid) {
    params = "userId=" + urlObj.userid + "&";
    pageing(0, params);
  }

  //查询按钮
  $scope.search = function() {
      //TODO  需要修改部分
      //起始时间时间戳
      var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
      //结束时间时间戳
      var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
      //用户名称
      var username = $("#userId").val();
      //会员类型
      var keyword = $("#txtUserName").val();
      //校验只有一个搜索条件
      if (!(minExpiredAt || maxExpiredAt || username || keyword)) {
        tool.alert("提示", "请至少输入一个搜索条件！");
        return false;
      }
      if (!username) {
        tool.alert("提示", "请选择会员姓名后再进行查询");
        return false;
      }
      //起止日期校验
      if (minExpiredAt && maxExpiredAt && (minExpiredAt > maxExpiredAt)) {
        tool.alert("提示", "结束时间不得早于起始时间！");
        return false;
      }
      params = '';
      if (minExpiredAt) {
        params += "minCreatedAt=" + minExpiredAt + '&';;
      }
      if (maxExpiredAt) {
        params += "maxCreatedAt=" + maxExpiredAt + '&';
      }
      if (keyword) {
        params += "medicineName=" + keyword + '&';
      }
      if (username) {
        params += "userId=" + username + '&';
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
    pageing($scope.toPageValue, params);
  }

  //加载完毕后再显示 
  $scope.$watch("viewContentLoaded", function() {
    angular.element(".myload").removeClass("myload");
  });
});