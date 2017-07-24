 $(function() {
   tool.changeSelect($("#sltDistrict"), false);
 });
 var params = ""; //全局变量
 var app = angular.module('myApp', []);

 // get /activity 接口
 // isReleased 活动是否发布
 // isAllowSignUp 活动是否可报名
 // isAllowSignUp
 //  活动是否可报名，0-不能报名，1-可已报名
 app.controller('customersCtrl', function($scope, $http) {
   //分页方法声明
   var pageing = function(pageindex, params) {
       //请求地址 
       var url = "http://60.205.170.209:8080/admin/api/activity?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           //判断当前是否存在记录
           $scope.dataLengths = data.content.length > 0;
           if (data.content != null && data.content.length > 0) {
             //赋值操作
             $scope.data = data;
             $scope.totalPage = data.totalPages;
             $scope.totalRecord = data.totalElements;
             initPageDiv($("#alreadyPage"),
               pageindex + 1,
               data.totalPages,
               5,
               $("#currentPage"),
               function() {
                 pageing($("#currentPage").val() - 1, params);
               });
           } else {}
         }
       });
     }
     //分页方法
   pageing(0, params);
   //查询按钮
   $scope.search = function() {

       //参数赋值
       var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
       var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
       var keyword = $("#txtKeyWord").val();
       var district = $("#sltDistrict").val();
       //校验只有一个搜索条件
       if (!(keyword || minExpiredAt || maxExpiredAt || district)) {
         tool.alert("提示", "请至少输入一个搜索条件");
         return false;
       }
       if (district == "3") {
         district = '1';
         var isAllowSignUp = '0';
       }
       //起止日期校验
       if (minExpiredAt && maxExpiredAt && (minExpiredAt > maxExpiredAt)) {
         tool.alert("提示", "活动日期中结束时间不得早于起始时间");
         return false;
       }
       //   params = "";
       params = '';
       if (minExpiredAt) {
         params += "minStartAt=" + minExpiredAt + '&';;
       }
       if (maxExpiredAt) {
         params += "maxStartAt=" + maxExpiredAt + '&';
       }
       if (keyword) {
         params += "keyWord=" + keyword + '&';
       }
       if (district) {
         params += "isReleased=" + district + '&';
       }
       if (isAllowSignUp && isAllowSignUp == '0') {
         params += "isAllowSignUp=" + isAllowSignUp + '&';
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

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });