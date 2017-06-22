      $(function() {
        tool.changeSelect($("#sltType"), true);
      });
      var params = ""; //全局变量
      var app = angular.module('myApp', []);
      app.controller('customersCtrl', function($scope, $http) {


        var url = BasicUrl + "vipCard?page=0&pageNum=1000";
        $http.get(url).success(function(data) {
          if (data != null && data != "" && data != "null") {
            $scope.options = data.content;
          }
        });
        //分页方法声明
        var pageing = function(pageindex, params) {
            var url = BasicUrl + "vip?" + params + "page=" + pageindex + "&pageNum=10";
            $http.get(url).success(function(data) {
              if (data != null && data != "" && data != "null") {
                //判断当前是否存在记录
                $scope.dataLengths = data.content.length > 0;
                if (data.content != null && data.content.length > 0) {
                  //赋值操作
                  $scope.title = '';
                  $scope.names = data;
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
                  tool.alert("提示", "当前条件下未获取到数据");

                }
              }
            }).error(function(msg) {
              tool.alert("提示", msg.errorMessage);
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
          //用户名称
          var username = $("#txtUserName").val();
          //会员类型
          var vipType = $("#sltType").val();
          //校验只有一个搜索条件
          if (!(minExpiredAt || maxExpiredAt || username || vipType)) {
            tool.alert("提示", "请至少输入一个搜索条件");
            return false;
          }
          //起止日期校验
          if (minExpiredAt && maxExpiredAt && minExpiredAt > maxExpiredAt) {
            tool.alert("提示", "结束时间不得早于起始时间");
            return false;
          }
          params = "";
          if (vipType == "0" || vipType == "2") {
            params += "state=" + vipType + '&';
          } else {
            if (vipType) {
              params += "id=" + vipType + '&';
            }
          }
          // params = '';
          if (minExpiredAt) {
            params += "minExpiredAt=" + minExpiredAt + '&';;
          }
          if (maxExpiredAt) {
            params += "maxExpiredAt=" + maxExpiredAt + '&';
          }

          if (username) {
            params += "keyWord=" + username + '&';
          }
          pageing(0, params);
        }

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