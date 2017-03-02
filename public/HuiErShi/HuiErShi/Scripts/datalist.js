 var params = "userName=&minCreatedAt=&maxCreatedAt="; //全局变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
     //分页方法声明
     var pageing = function(pageindex, params) {
         //请求地址
         //TODO  需要修改部分http://60.205.170.209:8080/admin/api/api-docs/../user
          var url = "../../JSON/users.json?"+params+"&page="+pageindex+"&pageNum=10"; //请求的参数和地址
         $http.get(url).success(function(data) {
             if (data != null && data != "" && data != "null") {
                 //判断当前是否存在记录
                 $scope.dataLengths = data.content.length > 0;
                 if (data.content != null && data.content.length > 0) {
                     //赋值操作
                     $scope.title = 'userName';
                     $scope.desc = 0;
                     $scope.names = data;
                     $scope.totalPage = data.totalPages;
                     $scope.totalRecord = data.totalElements;
                     //调用生成分页方法
                     initPageDiv($("#alreadyPage"), //在哪里生成页码
                         pageindex, //当前页
                         data.totalPages, //总页数
                         5, //每次显示多少页
                         $("#currentPage"), //隐藏域的值：当前页数
                         function() {
                             pageing($("#currentPage").val(), params);
                         });
                     //  $("#alreadyPage").show();
                 } else {
                     $("#databody").html('<tr><td colspan="100" class="text-center ">没有相关数据</td></tr> ');
                     //  $("#alreadyPage").hide(); //未获取到数据时删除操作
                 }
             }
         });
     }
     //分页方法
     pageing(1, params);
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
             alert("请至少输入一个搜索条件");
             return false;
         }
         //起止日期校验
         if (minExpiredAt > maxExpiredAt) { alert("活动日期中结束时间不得早于起始时间"); return false; }

         params = "userName=" + username + "&minCreatedAt=" + minExpiredAt + "&maxExpiredAt=" + maxExpiredAt;
         pageing(1, params);
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
 });
 $(function() {
    $(".start_end_time").datetimepicker();
 });
