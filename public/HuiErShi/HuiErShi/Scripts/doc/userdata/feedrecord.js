 $(function() {
   tool.changeSelect($("#username"), true);
 });
 var basicUrl = "http://healthshare.com.cn:80/admin/api/"; //统一接口地址
 var params = "feedback?"; //请求参数变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   //分页方法声明
   var pageing = function(pageindex, params) {
     var url = BasicUrl + params + "&page=" + pageindex + "&pageNum=10"; //请求地址
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         $scope.dataLengths = data.content.length > 0; //判断当前是否存在记录
         if (data.content != null && data.content.length > 0) {
           //赋值操作
           $scope.data = data;
           $scope.totalPage = data.totalPages;
           $scope.totalRecord = data.totalElements;
           //排序字段与排序方式 

           //调用生成分页方法
           initPageDiv($("#alreadyPage"), pageindex + 1, data.totalPages, 5, $("#currentPage"), function() {
             pageing($("#currentPage").val() - 1, params);
           });
         } else {
           $scope.dataLengths = 0;
           //  tool.alert("提示", "当前条件下未获取到数据");
         }
       }
     }).error(function(data) {
       //处理响应失败
       tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
     });
   }
   pageing(0, params);
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