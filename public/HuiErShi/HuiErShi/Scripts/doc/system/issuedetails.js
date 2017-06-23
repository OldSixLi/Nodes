 $(function() {
   // $(".start_end_time").datetimepicker();
   tool.changeSelect($("#sltDistrict"), false);
 });
 //
 var params = ""; //全局变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   //分页方法声明
   var pageing = function(pageindex, params) {
       //请求地址
       //TODO  需要修改部分
       // vipCard/delivery?
       // http://60.205.170.209:8080/admin/api/api-docs/../activity?
       // http://60.205.170.209:8080/admin/api/api-docs/../vipCard/delivery/1?page=0&pageNum=10
       var url = BasicUrl + "vipCard/delivery?" + params + "page=" + pageindex + "&pageNum=10&sortName=vipCardEntity.name&sortType=ASC"; //请求的参数和地址
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           //判断当前是否存在记录
           $scope.dataLengths = data.content.length > 0;
           if (data.content != null && data.content.length > 0) {
             //赋值操作
             $scope.data = data;
             $scope.totalPage = data.page.totalPage;
             $scope.totalRecord = data.page.totalResult;
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
             // alert("未获取到数据，请重试");
           }
         }
       });
     }
     //分页方法


   var detailObj = new UrlSearch();
   if (detailObj.id) {
     //存在此方法
     var url = BasicUrl + "vipCard/delivery/" + detailObj.id + "?page=0&pageNum=10"; //请求的参数和地址
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.dataLengths = data.content.length > 0;
         if (data.content != null && data.content.length > 0) {
           //赋值操作
           $scope.data = data;
           $scope.totalPage = data.page.totalPage;
           $scope.totalRecord = data.page.totalResult;
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
           // alert("未获取到数据，请重试");
         }
       }
     });
   } else {
     pageing(0, params);
   }

   //查询按钮
   $scope.search = function() {
       //TODO  需要修改部分

       //发放时间
       var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
       var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
       //激活时间
       var minExpiredAt1 = Date.parse(new Date($("#txtStartTime1").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime1").val()));
       var maxExpiredAt1 = Date.parse(new Date($("#txtEndTime1").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime1").val()));
       var keyword = $("#txtKeyWord").val();

       //校验只有一个搜索条件
       if (!(keyword || maxExpiredAt || minExpiredAt || minExpiredAt1 || maxExpiredAt1)) {
         tool.alert("提示", "请至少输入一个搜索条件");
         return false;
       }
       //起止日期校验
       if (minExpiredAt && maxExpiredAt && minExpiredAt > maxExpiredAt) {
         tool.alert("提示", "发放时间中结束时间不得早于起始时间");
         return false;
       }
       if (minExpiredAt1 && maxExpiredAt1 && minExpiredAt1 > maxExpiredAt1) {
         tool.alert("提示", "激活日期中结束时间不得早于起始时间");
         return false;
       }
       params = '';
       // keyWord=0&minDeliverAt=0&maxDeliverAt=0&minActiveAt=0&maxActiveAt=0&page=0&pageNum=10
       // (keyword || maxExpiredAt || minExpiredAt || minExpiredAt1 || maxExpiredAt1)
       if (keyword) {
         params += 'keyWord=' + keyword + '&';
       }
       if (minExpiredAt) {
         params += 'minDeliverAt=' + minExpiredAt + '&';
       }
       if (maxExpiredAt) {
         params += 'maxDeliverAt=' + maxExpiredAt + '&';
       }
       if (minExpiredAt1) {
         params += 'minActiveAt=' + minExpiredAt1 + '&';
       }
       if (maxExpiredAt1) {
         params += 'maxActiveAt=' + maxExpiredAt1 + '&';
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

   //退款
   //删除项目操作方法
   $scope.tuikuan = function(id) {
     // /vipCard/delivery/1
     var deleteUrl = BasicUrl + "vipCard/delivery/" + id;
     tool.confirm("提示",
       "是否确认退款",
       function() {
         $http({
           method: 'PATCH',
           url: deleteUrl,
           data: {
             id: id
           },
           transformRequest: function(obj) {
             var str = [];
             for (var p in obj) {
               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             }
             return str.join("&");
           },
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           }
         }).success(function(data, xhr) {
           if (xhr == 200) {
             if (data.errorMessage) {
               tool.alert("提示", data.errorMessage);　
             } else {
               tool.alert("提示", "退款成功！");
               //刷新当前页面.
               window.location.reload();
             }

           } else {
             tool.alert("提示", "退款失败,请重试！");
           }
         }).error(function(response) {
           tool.alert("提示", response.errorMessage);
         });
       },
       function() {});
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });