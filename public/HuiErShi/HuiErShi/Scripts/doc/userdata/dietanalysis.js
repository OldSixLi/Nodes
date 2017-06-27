 $(".start_end_time").datetimepicker({
   timepicker: false,
   format: 'Y-m-d',
 });

 $(function() {
   tool.changeSelect($("#username"), true);
 });
 var params = ""; //全局变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   var obj = new UrlSearch();
   $scope.currentPanel = "dietRecordAnalysis";
   var pageing = function(pageindex, params) {
     var url = BasicUrl + "dietAnalysis/" + $scope.currentPanel + "?userId=" + obj.userId + "&" + params;
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         $scope.dataLengths = data.length > 0;
         if (data != null && data.length > 0) {
           $scope.data = data;
         } else {
           $scope.dataLengths = false;
         }
       }
     });
   }

   //分页方法
   pageing(0, params);
   //查询按钮
   $scope.search = function() {
     //起始时间时间戳
     var minExpiredAt = $("#txtStartTime").val();
     //结束时间时间戳
     var maxExpiredAt = $("#txtEndTime").val();
     //校验只有一个搜索条件
     if (!minExpiredAt || !maxExpiredAt) {
       tool.alert("提示", "请选择起止日期！");
       return false;
     }
     //起止日期校验
     if (minExpiredAt > maxExpiredAt) {
       tool.alert("提示", "结束时间不得早于起始时间！");
       return false;
     }
     params = "minDate=" + minExpiredAt + "&maxDate=" + maxExpiredAt;
     pageing(0, params);
   }

   //返回上一级页面
   $scope.back = function() {
     var name = obj.userId;
     var time = obj.date;
     var username = obj.username;
     window.location.href = "FoodRecord.html?userId=" + name + "&username=" + obj.username + "&date=" + time;
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });

 });