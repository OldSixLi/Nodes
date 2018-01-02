 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 $(function() {

   $(".vipprices").keyup(function() {
     var reg = $(this).val().match(/\d+\.?\d{0,2}/);
     var txt = '';
     if (reg != null) {
       txt = reg[0];
     }
     $(this).val(txt);
   }).change(function() {
     $(this).keypress();
     var v = $(this).val();
     if (/\.$/.test(v)) {
       $(this).val(v.substr(0, v.length - 1));
     }
   });

   $("#userId").select2({
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
     width: "100%",
     templateResult: formatRepo,
     templateSelection: formatRepoSelection,
   });

   function formatRepo(repo) {
     return repo.realName;
   }

   function formatRepoSelection(repo) {
     return repo.realName;
   }
 });
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
 // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆ 
 var params = "";
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   //请求会员卡下拉菜单列表
   $scope.isSave = true;
   var url = BasicUrl + "vipCard?page=0&pageNum=1000";
   $http.get(url).success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data.content;
     }
   });


   tool.changeSelect($("#cardsList"), true);
   tool.changeSelect($("#modalCardsList"), true);
   //分页
   var pageing = function(pageindex, params) {

       // params + 
       var url = BasicUrl + "payment?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           //判断当前是否存在记录
           $scope.dataLengths = data.content.length > 0;
           if (data.content != null && data.content.length > 0) {
             //赋值操作
             $scope.title = 'outTradeNo';　
             $scope.desc = 0;
             $scope.data = data;
             $scope.totalPage = data.totalPages;
             $scope.totalRecord = data.totalElements;
             initPageDiv($("#alreadyPage"), pageindex + 1, data.totalPages, 5, $("#currentPage"),
               function() {
                 pageing($("#currentPage").val() - 1, params);
               });
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
     var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
     //结束时间时间戳
     var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
     //用户名称
     var keyWord = $("#txtKeyWord").val();
     var cardsList = $("#cardsList").val();

     //校验只有一个搜索条件
     if (!(minExpiredAt || maxExpiredAt || keyWord || cardsList)) {
       tool.alert("提示", "请至少输入一个搜索条件");
       return false;
     }
     //起止日期校验
     if (minExpiredAt && maxExpiredAt && minExpiredAt > maxExpiredAt) {
       tool.alert("提示", "起止日期中结束时间不得早于起始时间");
       return false;
     }
     params = '';
     if (keyWord) {
       params += 'keyWord=' + keyWord + '&';
     }
     if (cardsList) {
       params += 'cardId=' + cardsList + '&';
     }
     if (minExpiredAt) {
       params += 'minPayTime=' + minExpiredAt + '&';
     }
     if (maxExpiredAt) {
       params += 'maxPayTime=' + maxExpiredAt + '&';
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

   //添加支付
   $scope.save = function() {
     var __error = [];
     var data = {
       userId: $("#userId").val(),
       id: $("#modalCardsList").val(),
       totalFee: $("#cardFee").val()
     }
     if (data.totalFee == "") {
       __error.push("请输入金额！");
     }
     if (data.totalFee && !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(data.totalFee)) {
       __error.push("请输入正确的金额！");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     var url = BasicUrl + "payment";
     $http({
         method: 'POST',
         url: url,
         data: data,
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
       })
       .success(function(data, xhr) {
         if (xhr == 200) {
           if (data.errorMessage) {
             tool.alert("提示", data.errorMessage);
           } else {
             tool.alert("提示", "添加成功!");　
             window.location.reload();
           }
         } else {
           tool.alert("提示", "添加失败,请重试!");
         }
       }).error(function(response) {
         tool.alert("提示", response.errorMessage);
       });
   }


   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });