 $(function() {
   $(".start_end_time").datetimepicker({
     timepicker: false,
     format: 'Y-m-d',
   });　

   function formatRepo(repo) {
     return repo.realName;
   }

   function formatRepoSelection(repo) {
     return repo.realName || repo.text;
   }
   var $slt2 = $("#username").select2({
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
     width: "120px",
     templateResult: formatRepo,
     templateSelection: formatRepoSelection,
   });
 });


 function getLocalTime(tm) {
   var tt = new Date(parseInt(tm)).toLocaleString('chinese', {
     hour12: false
   }).replace(/\//g, "-");
   return tt;
 }

 //前一天
 function prevDay() {
   var date = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? Date.parse(new Date()) : Date.parse(new Date($("#txtStartTime").val()));

   date = date - 86400000;
   var time = getLocalTime(date);
   $('#txtStartTime').datetimepicker({
     value: time
   });
 }

 function nextDay() {
   var date = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? Date.parse(new Date()) : Date.parse(new Date($("#txtStartTime").val()));
   date = date + 86400000;
   var time = getLocalTime(date);
   $('#txtStartTime').datetimepicker({
     value: time
   });
 }



 var params = ""; //全局变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   //分页方法声明
   var pageing = function(pageindex, params) {
     //请求地址
     $scope.userid = 0;
     var url = BasicUrl + "dietAnalysis/mealNutritionEnergyAnalysis?" + params; //请求的参数和地址
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.dataLengths = data.length > 0;
         if (data != null && data.length > 0) {
           $scope.data = data;
           var totalCals = 0;
           for (var index = 0; index < data.length; index++) {
             var element = data[index];
             totalCals += element["脂肪cal"] + element["蛋白质cal"] + element["碳水化合物cal"];
           }
           $scope.totalCalAll = totalCals;
         } else {
           $scope.dataLengths = false;
         }
       } else {
         $scope.dataLengths = false;
         // alert("未获取到数据，请重试");
       }
     }).error(function() {
       $scope.dataLengths = false;
     });
     $http.get(BasicUrl + "dietAnalysis/dailyClassificationOfFoodIntake?" + params).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.fenleidataLengths = data.length > 0;
         if (data != null && data.length > 0) {
           $scope.fenleiData = data;
         } else {
           $scope.fenleidataLengths = false;
         }
       } else {
         $scope.fenleidataLengths = false;
       }
     }).error(function() {
       $scope.dataLengths = false;
     });
     $http.get(BasicUrl + "dietRecord?" + params).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.foodRecordDataLengths = data.length > 0;
         if (data != null && data.length > 0) {
           $scope.foodRecordData = data;
         } else {
           $scope.foodRecordDataLengths = false;
         }
       } else {
         $scope.foodRecordDataLengths = false;
       }
     }).error(function() {
       $scope.dataLengths = false;
     });

     $http.get(BasicUrl + "diary?" + params).success(function(data) {
       if (data != null && data != "" && data != "null") {
         $scope.remark = data;
       }
     }).error(function() {
       $scope.dataLengths = false;
     });
     //  diary?userId=1&date=2017-03-01
   }

   var index = 0;
   var UserID = "";
   var UserName = "";
   var obj = new UrlSearch();
   if (obj.userId && obj.date) {
     UserID = obj.userId;
     params = "userId=" + obj.userId + "&date=" + obj.date;
     $("#txtStartTime").val(obj.date);　

     $http.get(BasicUrl + "vip/" + obj.userId).success(function(data) {
       if (data != null && data != "" && data != "null" && data.id) {
         var data = {
           id: obj.userId,
           realName: data.realName
         };
         var newOption = new Option(data.realName, data.id, true, true);
         $('#username').append(newOption).trigger('change');
       }
     });
   } else {


   }
   //分页方法
   if (obj.USERID) {
     UserID = obj.USERID;
     params = "userId=" + obj.USERID + "&date=" + getToday();
     $("#txtStartTime").val(getToday());
     $http.get(BasicUrl + "vip/" + obj.USERID).success(function(data) {
       if (data != null && data != "" && data != "null" && data.id) {
         var data = {
           id: obj.USERID,
           realName: data.realName
         };
         var newOption = new Option(data.realName, data.id, true, true);
         $('#username').append(newOption).trigger('change');
       }
     });
     pageing(0, params);
   }

   //查询按钮
   $scope.search = function() {
     //用户名称
     var username = $("#username").val();
     //会员类型
     var time = $("#txtStartTime").val();
     //校验只有一个搜索条件
     if (!(username || time)) {
       tool.alert("提示", "请至少输入一个搜索条件！");
       return false;
     }
     if (!username) {
       tool.alert("提示", "请选择用户！");
       return false;
     }
     if (!time) {
       tool.alert("提示", "请选择时间！");
       return false;
     }
     params = "userId=" + username + "&date=" + time;
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

   $scope.redirect = function() {
     if ($("#username").val() > 10000 && !obj.userId) {
       tool.alert("提示", "请选择用户！");
       return false;
     }
     window.location.href = "DietAnalysis.html?userId=" + $("#username").val() + "&username=" + UserName + "&date=" + $("#txtStartTime").val();
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });


 function getToday() {
   var time = new Date();
   var y = time.getFullYear();
   var m = time.getMonth() + 1;
   var d = time.getDate();
   var h = time.getHours();
   var mm = time.getMinutes();
   var s = time.getSeconds();
   return y + '-' + add0(m) + '-' + add0(d);
 }

 function add0(m) { return m < 10 ? '0' + m : m; }