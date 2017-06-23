    $(function() {
      // $(".start_end_time").datetimepicker();
      var tool = new JSTOOL();
      tool.changeSelect($("#username"), true);
    });
    //
    var params = ""; //全局变量  请求的参数
    var app = angular.module('myApp', []);
    app.controller('customersCtrl', function($scope, $http) {
      //分页方法声明
      var pageing = function(pageindex, params) {
          var url = BasicUrl + "diet?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
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
                $scope.dataLengths = false;
                // alert("未获取到数据，请重试");
              }
            }
          });
        }
        //分页方法
      pageing(0, params);
      //查询按钮
      $scope.search = function() {

          //起始时间时间戳
          var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
          //结束时间时间戳
          var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));

          var foodname = $("#foodname").val();
          var sltTag = $("#sltTag").val();

          //校验只有一个搜索条件
          if (!(foodname || sltTag)) {
            tool.alert("提示", "请至少输入一个搜索条件");
            return false;
          }
          params = "";
          if (foodname) {
            params += "name=" + foodname + "&";
          }
          if (sltTag) {
            params += "sltTag=" + sltTag + "&";
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

      //删除项目操作方法
      $scope.deleteItem = function(id) {
        //TODO   url需要变化
        var deleteUrl = BasicUrl + "diet/" + id;
        tool.confirm("提示",
          "是否确认删除？",
          function() {
            $http({
                method: 'DELETE',
                url: deleteUrl,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .success(function(data, xhr) {
                if (xhr == 200) {
                  tool.alert("提示", "删除成功!");　
                  //刷新当前页面
                  window.location.reload();
                } else {
                  tool.alert("提示", "删除失败,请重试!");
                }
              }).error(function(response) {
                tool.alert("提示", response.errorMessage);
              });
          },
          function() {}
        );
      }
      $scope.$watch("viewContentLoaded", function() {
        angular.element(".myload").removeClass("myload");
      })
    });