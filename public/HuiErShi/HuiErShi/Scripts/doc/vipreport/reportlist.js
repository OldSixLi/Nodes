 $(function() {
   // $(".start_end_time").datetimepicker();　
   tool.changeSelect($("#username"), true);
   tool.changeSelect($("#sltStatus"), false);
   //会籍顾问 TODO 

   //检查项目  TODO 
   $("#sltTag").select2({
     placeholder: '请选择',
     allowClear: true,
     ajax: {
       // url: BasicUrl + "vip/name",

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
     // escapeMarkup: function(markup) {
     //   return markup;
     // },
     minimumInputLength: 1,
     minimumResultsForSearch: 1,
     width: "220px",
     templateResult: formatRepo,
     templateSelection: formatRepoSelection,
   });
 });

 function formatRepo(repo) {
   return repo.realName;
 }

 function formatRepoSelection(repo) {
   return repo.realName;
 }

 var params = ""; //全局变量  请求的参数
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   var obj = new UrlSearch();


   $http.get(BasicUrl + "admin/advisers").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data;
     }
   });

   tool.changeSelect($("#sltAdviser"), false);
   //分页方法声明
   var pageing = function(pageindex, params) {
     //TODO  需要修改部分    
     var url = BasicUrl + "report?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.dataLengths = data.content.length > 0;
         if (data.content != null && data.content.length > 0) {
           //赋值操作
           $scope.title = 'gender'; //排序字段
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
           tool.alert("提示", "该条件下没有相关数据");
         }
       }
     });
   }


   //会籍顾问根据角标提示进入此页面
   if (obj.adminId) {
     params = "adviserId=" + obj.adminId + "&"
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
     var adviserId = $("#sltAdviser").val();
     var status = $("#sltStatus").val();

     //校验只有一个搜索条件
     if (!(minExpiredAt || maxExpiredAt || keyWord || adviserId || status)) {
       tool.alert("提示", "请至少输入一个搜索条件");
       return false;
     }

     //起止日期校验
     if (minExpiredAt != 0 && maxExpiredAt != 0 && minExpiredAt > maxExpiredAt) {
       alert("报告日期中结束时间不得早于起始时间");
       return false;
     }
     params = ""
     if (minExpiredAt != 0) {
       params += "minCreatedAt=" + minExpiredAt + "&";
     }
     if (maxExpiredAt != 0) {
       params += "maxCreatedAt=" + maxExpiredAt + "&";
     }
     if (status) {
       params += "status=" + status + "&";
     }
     if (keyWord) {
       params += "keyWord=" + keyWord + "&";
     }
     if (adviserId) {
       params += "adviserId=" + adviserId + "&";
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