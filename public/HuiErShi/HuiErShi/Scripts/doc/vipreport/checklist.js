 $(function() {





   // $("#txtKeyWord").select2({
   //   placeholder: '请选择',
   //   allowClear: true,
   //   ajax: {
   //     url: function(params) {
   //       return BasicUrl + "vip/name/" + params.term;
   //     },
   //     dataType: 'json',
   //     delay: 250,
   //     processResults: function(data, page) {
   //       return {
   //         results: data
   //       };
   //     },
   //     cache: false
   //   },
   //   minimumInputLength: 1,
   //   minimumResultsForSearch: 1,
   //   width: "150px",
   //   templateResult: formatRepo,
   //   templateSelection: formatRepoSelection,
   // });

   // function formatRepo(repo) {
   //   return repo.realName;
   // }

   // function formatRepoSelection(repo) {
   //   return repo.realName;
   // }
 });


 tool.changeSelect($("#sltTag"), false);

 // keyWord=&adviserId=&minCreatedAt=&maxCreatedAt=
 var params = ""; //全局变量  请求的参数
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   //分页方法声明 
   var url = BasicUrl + "admin/advisers";
   $http.get(url).success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data;
       tool.changeSelect($("#sltAdviser"), true);
     }
   });

   var pageing = function(pageindex, params) {
     var url = BasicUrl + "inspection?" + params + "page=" + pageindex + "&pageNum=10";
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.dataLengths = data.content.length > 0;
         if (data.content != null && data.content.length > 0) {
           //赋值操作
           $scope.title = 'FP_HM'; //排序字段
           $scope.desc = 0; //排序方式（默认升序）
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
           // tool.alert("提示", "未获取到数据！");
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
     //用户名称
     var keyWord = $("#txtKeyWord").val();
     //会员类型
     var type = $("#sltTag").val();
     var adviserId = $("#sltAdviser").val();
     //校验只有一个搜索条件
     if (!(minExpiredAt || maxExpiredAt || keyWord || type || adviserId)) {　　　
       tool.alert("提示", "请至少输入一个搜索条件!");
       return false;
     }
     //起止日期校验
     if (minExpiredAt > maxExpiredAt) {　
       tool.alert("提示", "活动日期中结束时间不得早于起始时间!");
       return false;
     }
     params = '';
     if (keyWord) {
       params += 'keyWord=' + keyWord + '&';
     }
     if (adviserId) {
       params += 'adviserId=' + adviserId + '&';
     }
     if (type) {
       params += 'type=' + type + '&';
     }
     if (minExpiredAt) {
       params += 'minCreatedAt=' + minExpiredAt + '&';
     }
     if (maxExpiredAt) {
       params += 'maxCreatedAt=' + maxExpiredAt + '&';
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